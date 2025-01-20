import { Platform } from 'react-native';

export const localImageToDataUrl = async (image: any): Promise<string> => {
  if (Platform.OS === 'web') {
    const file = image as File;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
    });
  } else {
    const asset = image as { uri: string };
    return asset.uri;
  }
};

export const sendImageToBackend = async (imageDataUrl: string) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/describe_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_data_url: imageDataUrl,
      }),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error sending image to backend:', error);
    throw error;
  }
};
