import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Recycle AI</Text>
        <Image source={require('../resources/logo_ivm.png')} style={styles.logo} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF', // Adjust the background color to match the header
    width: '100%', // Ensure the header is full-width
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusts alignment to push items to the edges
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 10, // Round the bottom left corner
    borderBottomRightRadius: 10, // Round the bottom right corner
    width: '100%', // Ensure the container is as wide as the screen
    shadowColor: "#000", // These lines add shadow for elevation effect
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    color: '#625447',
    fontWeight: 'bold',
  }
});

export default Header;
