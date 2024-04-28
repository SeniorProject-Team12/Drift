import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const UserProfileImage = ({ image, selectImage }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text></Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default UserProfileImage;