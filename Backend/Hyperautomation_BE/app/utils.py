import base64
from mimetypes import guess_type

"""Depricated this method(local_image_to_data_url) should be moved to the FE"""

def local_image_to_data_url(image_path):
    mime_type, _ = guess_type(image_path)
    if mime_type is None:
        mime_type = 'application/octet-stream'

    with open(image_path, "rb") as image_file:
        base64_encoded_data = base64.b64encode(image_file.read()).decode('utf-8')
        
    print(f"data:{mime_type};base64,{base64_encoded_data}")
    return f"data:{mime_type};base64,{base64_encoded_data}"


def read_prompt_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return file.read().strip()
    except FileNotFoundError:
        return "Default prompt text"
    except Exception as e:
        return f"Error reading prompt: {str(e)}"