from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.test_routes import test_bp
    from app.routes.item_routes import item_bp
    from app.routes.order_routes import order_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(test_bp, url_prefix='/test')
    app.register_blueprint(item_bp, url_prefix='/item')
    app.register_blueprint(order_bp, url_prefix='/order')

    return app