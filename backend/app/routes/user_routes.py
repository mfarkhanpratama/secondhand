from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/address', methods=['GET'])
@jwt_required()
def get_user_address():
    identity = get_jwt_identity()
    user_id = identity.get("id")  # Extract user_id from the dictionary

    user = User.query.get(user_id)
  # Ensure this returns a valid user ID
    print(f"Fetched user_id: {user_id}")  # Debugging

    user = User.query.get(user_id)  # This will fail if user_id is invalid
    if user:
        return jsonify({"street": user.street, "city": user.city_code})
    return jsonify({"error": "User not found"}), 404
