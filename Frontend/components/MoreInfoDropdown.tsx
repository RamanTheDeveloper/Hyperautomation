import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MoreInfoDropdownProps {
  item: {
    name: string;
    certainty: string;
    short_explanation: string;
    long_explanation: string;
  };
}

const MoreInfoDropdown: React.FC<MoreInfoDropdownProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
        <Text style={styles.buttonText}>More info ▼</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text><Text style={styles.label}>Long Explanation:</Text> {item.long_explanation}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '600',
  },
});

export default MoreInfoDropdown;
