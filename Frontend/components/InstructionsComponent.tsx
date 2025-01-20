import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InstructionsComponentProps {
  instructions: string;
  moreInfo: string;
}

const InstructionsComponent: React.FC<InstructionsComponentProps> = ({ instructions, moreInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Instructions</Text>
      <Text>{instructions}</Text>
      <Text style={styles.heading}>More info</Text>
      <Text>{moreInfo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default InstructionsComponent;
