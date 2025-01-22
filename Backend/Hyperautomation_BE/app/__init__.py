from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config['JSON_AS_ASCII'] = False
    with app.app_context():
        from .routes import init_routes
        init_routes(app)

    return app