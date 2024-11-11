from flask import Blueprint, request, jsonify
from app.models import User, db
from app import bcrypt
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validate required fields
    required_fields = ['username', 'email', 'password', 'city_code', 'street', 'postal_code']
    if not all(field in data for field in required_fields):
        return jsonify({"message": "All fields are required: username, email, password, city_code, street, postal_code"}), 400

    username = data['username']
    email = data['email']
    password = data['password']
    city_code = data['city_code']
    street = data['street']
    postal_code = data['postal_code']

    # Check if user exists
    if User.query.filter((User.email == email) | (User.username == username)).first():
        return jsonify({"message": "User already exists"}), 409

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        # Create new user
        new_user = User(
            username=username,
            email=email,
            password=hashed_password,
            city_code=city_code,
            street=street,
            postal_code=postal_code
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error during registration: {e}")
        return jsonify({"message": "Internal server error"}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={"id": user.id, "username": user.username})
        return jsonify(access_token=access_token), 200

    return jsonify({"message": "Invalid email or password"}), 401