import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';

const CameraComponent = Platform.OS === 'web'
  ? require('./components/CameraComponent.web').default
  : require('./components/CameraComponent.mobile').default;

import InstructionsComponent from './components/InstructionsComponent';
import axios from 'axios';
import { BACKEND_URL } from '@env';
import { Asset } from 'react-native-image-picker';

interface ApiResponse {
  instructions: string;
  more_info: string;
}

export default function App() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageSubmit = async (photo: Asset | File) => {
    setLoading(true);
    const formData = new FormData();
    const imageBlob = {
      uri: (photo as any).uri || (photo as File).name,  // Handle web vs mobile
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recycle AI</Text>
      <CameraComponent onSubmit={handleImageSubmit} />
      {loading && <Text>Loading...</Text>}
      {response && (
        <InstructionsComponent
          instructions={response.instructions}
          moreInfo={response.more_info}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
