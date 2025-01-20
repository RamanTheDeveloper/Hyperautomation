import os
from openai import AzureOpenAI
from .utils import read_prompt_from_file

endpoint = os.getenv("ENDPOINT_URL", "https://oai-chatbot-dev-se.openai.azure.com/")
deployment = os.getenv("DEPLOYMENT_NAME", "gpt-4o")
subscription_key = os.getenv("AZURE_OPENAI_API_KEY", "")

client = AzureOpenAI(
    azure_endpoint=endpoint,
    api_key=subscription_key,
    api_version="2024-08-01-preview"
)

def send_to_openai(image_data_url):
    prompt_text = read_prompt_from_file("./resources/prompt.txt")
    response = client.chat.completions.create(
        model=deployment,
        messages=[
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": [  
                { 
                    "type": "text", 
                    "text": prompt_text
                },
                { 
                    "type": "image_url",
                    "image_url": {
                        "url": image_data_url
                } 
                }
            ] } 
        ],
        max_tokens=2000 
    )

    return response
