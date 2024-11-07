from flask import Blueprint
from app import db
from sqlalchemy import text 

test_bp = Blueprint('test', __name__)

# Ping route to check if the server is running
@test_bp.route('/ping', methods=['GET'])
def ping():
    return {"message": "Pong!"}, 200

# Test database connection
@test_bp.route('/db-connection', methods=['GET'])
def test_db():
    try:
        # Use the text function to execute raw SQL
        db.session.execute(text('SELECT 1'))
        return "Database connection successful!", 200
    except Exception as e:
        return f"Database connection failed: {e}", 500
