import { Platform } from 'react-native';

export const localImageToDataUrl = async (image: any): Promise<string> => {
  if (Platform.OS === 'web') {
    const file = image as File; // For web, handle it as a File
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result as string); // Returns the base64 data URL
      };
      reader.onerror = (error) => reject(error);
    });
  } else {
    // For mobile (React Native), handle the Asset or File accordingly
    const asset = image as { uri: string };
    return asset.uri; // Just returning the URI for mobile devices
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
    return responseData; // Return the backend response (e.g., the result from OpenAI)
  } catch (error) {
    console.error('Error sending image to backend:', error);
    throw error; // Handle error
  }
};
