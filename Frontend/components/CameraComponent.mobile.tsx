import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { launchCamera, ImagePickerResponse, Asset } from 'react-native-image-picker';

interface CameraComponentProps {
  onSubmit: (photo: Asset) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onSubmit }) => {
  const [photo, setPhoto] = useState<Asset | null>(null);

  const takePicture = () => {
    launchCamera(
      { mediaType: 'photo', cameraType: 'back' },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('Image Picker Error:', response.errorMessage);
        } else if (response.assets && response.assets[0]) {
          const capturedPhoto = response.assets[0];
          setPhoto(capturedPhoto);
          onSubmit(capturedPhoto);
        }
      }
    );
  };

  const clearPicture = () => {
    setPhoto(null);
  };

  return (
    <View>
      <Button title="Take Picture" onPress={takePicture} />
      {photo && (
        <View>
          <Image source={{ uri: photo.uri }} style={styles.image} />
          <Button title="Clear" onPress={clearPicture} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
});

export default CameraComponent;
