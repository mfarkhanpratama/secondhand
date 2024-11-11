from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Item, db, User

item_bp = Blueprint('item', __name__)

# Create a new item (requires authentication)
@item_bp.route('/items', methods=['POST'])
@jwt_required()
@jwt_required()
def create_item():
    data = request.get_json()

    name = data.get('name')
    description = data.get('description', '')
    price = data.get('price')
    weight = data.get('weight')  # Weight will be validated below

    try:
        price = float(price)  # Ensure price is numeric
        weight = float(weight)  # Ensure weight is numeric
    except ValueError:
        return jsonify({"message": "Price and weight must be numeric values"}), 400

    if not name or price <= 0 or weight <= 0:
        return jsonify({"message": "Name, valid price, and weight are required"}), 400

    identity = get_jwt_identity()
    current_user = identity.get("id")

    user = User.query.get_or_404(current_user)

    new_item = Item(
        name=name,
        description=description,
        price=price,
        weight=weight,
        seller_id=user.id
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify({"message": "Item created successfully", "item_id": new_item.id}), 201

# Get all items sold by the current user
@item_bp.route('/user/items', methods=['GET'])
@jwt_required()
def get_user_items():
    identity = get_jwt_identity()
    user_id = identity.get("id")  # Get the current user's ID

    # Query items where the seller is the current user
    user_items = Item.query.filter_by(seller_id=user_id).all()

    # Serialize the items for response
    item_list = [
        {
            "id": item.id,
            "name": item.name,
            "description": item.description,
            "price": item.price,
            "weight": item.weight,
            "images": ["/produk1.png", "/produk2.png", "/produk3.png"],  # Replace with actual image logic
        } for item in user_items
    ]

    return jsonify(item_list), 200


# Get all items
@item_bp.route('/items', methods=['GET'])
def get_all_items():
    items = Item.query.all()
    item_list = [
        {
            "id": item.id,
            "name": item.name,
            "price": item.price,
            "weight": item.weight,
            "description": item.description,
            "images": ["/produk1.png", "/produk2.png", "/produk3.png"],  # Add images
            "seller": item.seller.username  # Access seller's username
        } for item in items
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
        "weight": item.weight,
        "images": ["/produk1.png", "/produk2.png", "/produk3.png"],
        "seller": item.seller.username  # Access seller directly through relationship
    }), 200

# Update an item (requires authentication and must be the seller)
@item_bp.route('/items/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_item(item_id):
    item = Item.query.get_or_404(item_id)
    current_user = get_jwt_identity()

    # Ensure the user updating the item is the item's seller
    if item.seller_id != current_user['id']:
        return jsonify({"message": "You can only update your own items"}), 403

    # Get and validate the input data
    data = request.get_json()
    if not data:
        return jsonify({"message": "No data provided"}), 400

    name = data.get('name', item.name)
    description = data.get('description', item.description)
    price = data.get('price', item.price)
    weight = data.get('weight', item.weight)

    if not isinstance(price, (int, float)) or price <= 0:
        return jsonify({"message": "Invalid price"}), 400

    if not isinstance(weight, (int, float)) or weight <= 0:
        return jsonify({"message": "Invalid weight"}), 400

    # Update item fields
    item.name = name
    item.description = description
    item.price = price
    item.weight = weight

    try:
        db.session.commit()
        return jsonify({
            "message": "Item updated successfully",
            "item": {
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "price": item.price,
                "weight": item.weight,
                "seller_id": item.seller_id
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Failed to update item: {str(e)}"}), 500

# Delete an item (requires authentication and must be the seller)
@item_bp.route('/items/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_item(item_id):
    item = Item.query.get_or_404(item_id)
    current_user = get_jwt_identity()

    if item.seller_id != current_user:
        return jsonify({"message": "You can only delete your own items"}), 403

    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted successfully"}), 200
