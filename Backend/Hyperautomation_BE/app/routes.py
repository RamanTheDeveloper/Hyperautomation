from flask import jsonify, request
from .image_description_service import process_image

def init_routes(app):
    @app.route('/describe_image', methods=['POST'])
    def describe_image():
        data = request.get_json()
        if not data or 'image_data_url' not in data:
            return jsonify({'error': 'No image data URL provided'}), 400

        try:
            serialized_items = process_image(data['image_data_url'])
            return jsonify(serialized_items)
        except ValueError as e:
            return jsonify({'error': str(e)}), 500