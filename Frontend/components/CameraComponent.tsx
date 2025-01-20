import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { launchCamera, ImagePickerResponse, Asset } from 'react-native-image-picker';

interface CameraComponentProps {
  onSubmit: (photo: Asset) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onSubmit }) => {
  const [photo, setPhoto] = useState<Asset | null>(null);

  const takePicture = () => {
    launchCamera({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        const capturedPhoto = response.assets[0];
        setPhoto(capturedPhoto);
        onSubmit(capturedPhoto);
      }
    });
  };

  return (
    <View>
      <Button title="Take Picture" onPress={takePicture} />
      {photo && <Image source={{ uri: photo.uri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});

export default CameraComponent;
