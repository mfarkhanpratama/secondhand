import requests
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from config import Config  # RajaOngkir API Key stored securely

shipping_bp = Blueprint('shipping', __name__)

@shipping_bp.route('/calculate-shipping', methods=['POST'])
@jwt_required()
def calculate_shipping():
    data = request.get_json()

    origin = data.get('origin')
    destination = data.get('destination')
    weight = data.get('weight')
    courier = data.get('courier', 'jne')  # Default to JNE

    if not origin or not destination or not weight:
        return jsonify({"message": "Origin, destination, and weight are required"}), 400

    try:
        response = requests.post(
            "https://api.rajaongkir.com/starter/cost",
            headers={
                "key": Config.RAJAONGKIR_API_KEY,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data={
                "origin": origin,
                "destination": destination,
                "weight": weight,
                "courier": courier
            }
        )

        if response.status_code == 200:
            return jsonify(response.json()['rajaongkir']['results']), 200
        else:
            return jsonify({"message": "Failed to calculate shipping", "error": response.json()}), 400

    except requests.RequestException as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
