import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

// Dynamically import the CameraComponent based on the platform (web or mobile)
const CameraComponent = Platform.OS === 'web'
  ? require('./components/CameraComponent.web').default
  : require('./components/CameraComponent.mobile').default;

import InstructionsComponent from './components/InstructionsComponent';
import ImageUploadComponent from './components/ImageUploadComponent';
import axios from 'axios';
import { BACKEND_URL } from '@env';
import { Asset } from 'react-native-image-picker';
import Header from './components/Header';

interface ApiResponse {
  instructions: string;
  more_info: string;
  image: File | Asset | null;
}

export default function App() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | Asset | null>(null);

  const handleImageSubmit = async (photo: Asset | File) => {
    setLoading(true);
    const formData = new FormData();
    const imageBlob = {
      uri: (photo as any).uri || (photo as File).name,
      type: (photo as any).type || 'image/jpeg',
      name: (photo as any).fileName || (photo as File).name,
    } as any;
    formData.append('image', imageBlob);

    try {
      const res = await axios.post<ApiResponse>(BACKEND_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelection = (image: File | Asset) => {
    setSelectedImage(image);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Recycle AI</Text>
        <CameraComponent onSubmit={handleImageSelection} />
        {selectedImage && <ImageUploadComponent image={selectedImage} />}
        {loading && <Text>Loading...</Text>}
        {response && (
          <InstructionsComponent
            instructions={response.instructions}
            moreInfo={response.more_info}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start', // Updated this line
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
