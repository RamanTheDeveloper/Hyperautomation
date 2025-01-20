import React, { useState } from 'react';
import { Button, View, Text, Platform } from 'react-native';
import { localImageToDataUrl, sendImageToBackend } from '../utils/utils';
import { Asset } from 'react-native-image-picker';

interface ImageUploadComponentProps {
  image: File | Asset | null;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({ image }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSubmit = async () => {
    if (!image) {
      return;
    }

    setLoading(true);
    try {
      const imageDataUrl = await localImageToDataUrl(image);

      const backendResponse = await sendImageToBackend(imageDataUrl);

      setResponse(`Response from backend: ${JSON.stringify(backendResponse)}`);
    } catch (error) {
      setError('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {response && <Text>{response}</Text>}
      {error && <Text>{error}</Text>}
      {image && !loading && (
        <Button title="Submit Image" onPress={handleImageSubmit} />
      )}
    </View>
  );
};

export default ImageUploadComponent;
