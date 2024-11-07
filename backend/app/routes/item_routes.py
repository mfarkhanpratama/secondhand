from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Item, db

item_bp = Blueprint('item', __name__)

# Create a new item (requires authentication)
@item_bp.route('/items', methods=['POST'])
@jwt_required()
def create_item():
    data = request.get_json()

    name = data.get('name')
    description = data.get('description')
    price = data.get('price')

    if not name or not price:
        return jsonify({"message": "Name and price are required"}), 400

    current_user = get_jwt_identity()
    new_item = Item(
        name=name,
        description=description,
        price=price,
        seller_id=current_user['id']
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify({"message": "Item created successfully", "item": new_item.id}), 201

# Get all items
@item_bp.route('/items', methods=['GET'])
def get_all_items():
    items = Item.query.all()
    item_list = [
        {"id": item.id, "name": item.name, "price": item.price, "seller": item.seller.username}
        for item in items
    ]
    return jsonify(item_list), 200

# Get a specific item by ID
@item_bp.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = Item.query.get_or_404(item_id)
    return jsonify({
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "seller": item.seller.username
    }), 200

# Update an item (requires authentication and must be the seller)
@item_bp.route('/items/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_item(item_id):
    item = Item.query.get_or_404(item_id)
    current_user = get_jwt_identity()

    if item.seller_id != current_user['id']:
        return jsonify({"message": "You can only update your own items"}), 403

    data = request.get_json()
    item.name = data.get('name', item.name)
    item.description = data.get('description', item.description)
    item.price = data.get('price', item.price)

    db.session.commit()
    return jsonify({"message": "Item updated successfully"}), 200

# Delete an item (requires authentication and must be the seller)
@item_bp.route('/items/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_item(item_id):
    item = Item.query.get_or_404(item_id)
    current_user = get_jwt_identity()

    if item.seller_id != current_user['id']:
        return jsonify({"message": "You can only delete your own items"}), 403

    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted successfully"}), 200
