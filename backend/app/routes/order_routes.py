from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Order, Item, db

order_bp = Blueprint('order', __name__)

# Place an order
@order_bp.route('/orders', methods=['POST'])
@jwt_required()
def place_order():
    data = request.get_json()
    item_id = data.get('item_id')

    if not item_id:
        return jsonify({"message": "Item ID is required"}), 400

    item = Item.query.get_or_404(item_id)

    # Check if the item is already sold
    existing_order = Order.query.filter_by(item_id=item.id, status='Completed').first()
    if existing_order:
        return jsonify({"message": "Item is already sold"}), 400

    current_user = get_jwt_identity()
    new_order = Order(
        buyer_id=current_user['id'],
        item_id=item.id,
        total_price=item.price
    )

    db.session.add(new_order)
    db.session.commit()

    return jsonify({"message": "Order placed successfully", "order_id": new_order.id}), 201

# Get all orders for the logged-in user
@order_bp.route('/orders', methods=['GET'])
@jwt_required()
def get_user_orders():
    current_user = get_jwt_identity()
    orders = Order.query.filter_by(buyer_id=current_user['id']).all()

    order_list = [
        {
            "id": order.id,
            "item": order.item.name,
            "total_price": order.total_price,
            "status": order.status,
            "created_at": order.created_at
        }
        for order in orders
    ]

    return jsonify(order_list), 200

# Get a specific order by ID
@order_bp.route('/orders/<int:order_id>', methods=['GET'])
@jwt_required()
def get_order(order_id):
    current_user = get_jwt_identity()
    order = Order.query.get_or_404(order_id)

    if order.buyer_id != current_user['id']:
        return jsonify({"message": "You can only view your own orders"}), 403

    return jsonify({
        "id": order.id,
        "item": order.item.name,
        "total_price": order.total_price,
        "status": order.status,
        "created_at": order.created_at
    }), 200
