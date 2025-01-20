from .azure_open_api import send_to_openai
from .models import WasteItem
import json

def process_image(image_data_url):
    chat_completion = send_to_openai(image_data_url)
    if not hasattr(chat_completion, 'choices') or not chat_completion.choices:
        raise ValueError('No choices available in the response')
    
    try:
        items_data = json.loads(chat_completion.choices[0].message.content)
        items = [WasteItem(**item) for item in items_data]
        return [item.serialize() for item in items]
    except json.JSONDecodeError:
        raise ValueError('Failed to decode JSON data')