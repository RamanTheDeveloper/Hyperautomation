import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ImagePickerButton from '../components/ImagePickerButton';
import DisplayImageCard from '../components/DisplayImageCard';
import DisplayInfoCard from '../components/DisplayInfoCard';
import CustomButton from '../components/CustomButton';
import globalStyles from '../styles/globalStyles';

export default function ImagePickerScreen() {
  const [image, setImage] = useState<string | null>(null);

  const handleSendImage = async () => {
    if (!image) {
      Alert.alert('No image selected', 'Please pick an image first.');
      return;
    }

    console.log('Sending image:', image);
    // TODO: Add API logic here
  };

  return (
    <View style={globalStyles.container}>
      <ImagePickerButton onImagePicked={setImage} />
{selectedImage && (
  <DisplayImageCard 
    imageUri={selectedImage} 
    onClear={handleClearAll} 
  />
)}
      <DisplayInfoCard infoText="Pick an image and send it!" />
      <CustomButton title="Send" onPress={handleSendImage} />
    </View>
  );
}
