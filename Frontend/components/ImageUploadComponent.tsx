import React, { useState } from 'react';
import { Button, View, Text, Platform } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '@env';
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
    const formData = new FormData();

    let imageBlob: any;

    if (Platform.OS === 'web') {
      if (image instanceof File) {
        imageBlob = {
          uri: URL.createObjectURL(image),
          type: image.type,
          name: image.name,
        };
      }
    } else {
      if (image && (image as Asset).uri) {
        const asset = image as Asset;
        imageBlob = {
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || 'photo.jpg',
        };
      }
    }

    if (imageBlob) {
      formData.append('image', imageBlob);

      try {
        const res = await axios.post(`${BACKEND_URL}/upload-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResponse(`Image uploaded successfully: ${res.data}`);
      } catch (error) {
        setError('Error uploading image');
      } finally {
        setLoading(false);
      }
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
