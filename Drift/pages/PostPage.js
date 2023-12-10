import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const categories = [
  'Shirt',
  'Pants',
  'Jacket',
  'Shoes',
  'Dress',
  'Skirt',
  'Hat',
  'Accessory',
  'Other',
];

const PostItemScreen = () => {
  const [images, setImages] = useState([null, null, null]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('Select Category');

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  const selectImage = async (index) => {
    // If an image is already selected, show options to delete or select a different one
    if (images[index]) {
      Alert.alert(
        'Image Options',
        'Choose an option:',
        [
          {
            text: 'Delete',
            onPress: () => deleteImage(index),
            style: 'destructive',
          },
          {
            text: 'Select Different Image',
            onPress: async () => {
              // Reset the current image
              const newImages = [...images];
              newImages[index] = null;
              setImages(newImages);
  
              // Launch the image picker to select a different image
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1], // Square aspect ratio
                quality: 1,
              });
  
              if (!result.canceled) {
                const updatedImages = [...images];
                updatedImages[index] = result.assets[0].uri;
                setImages(updatedImages);
  
                // Clear error message when user selects an image
                setErrorMessage('');
              }
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else {
      // If no image is selected, allow the user to pick a new one
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio
        quality: 1,
      });
  
      if (!result.canceled) {
        const newImages = [...images];
        newImages[index] = result.assets[0].uri;
        setImages(newImages);
  
        // Clear error message when user selects an image
        setErrorMessage('');
      }
    }
  };
  

  const deleteImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const chooseDifferentImage = (index) => {
    // Set the current image to null before selecting a different one
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  
    // Allow the user to choose a different image
    selectImage(index);
  };

  const handleSubmit = () => {
    // Check if at least one image is uploaded and all fields are filled
    if (!images.some((image) => image) || !title || !description || !price) {
      setErrorMessage('Please upload at least one image and fill in all fields before submitting.');
    } else {

      //Eventually send data to back end
      console.log('Images:', images);
      console.log('Title:', title);
      console.log('Description:', description);
      console.log('Price:', price);

      // Clear the form and error message after submission
      setImages([null, null, null]);
      setTitle('');
      setDescription('');
      setPrice('');
      setErrorMessage('');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.imageRow}>
          {images.map((img, index) => (
            <TouchableOpacity
              key={index}
              style={styles.smallImageContainer}
              onPress={() => selectImage(index)}
            >
              {img ? (
                <Image source={{ uri: img }} style={styles.smallImage} />
              ) : (
                <Text>Select Image</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={[styles.input, styles.titleInput]}
          placeholder="Enter title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Enter description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <Text style={styles.label}>Price</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
          <TouchableOpacity
            style={styles.selectCategoryButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{selectedCategoryLabel}</Text>
          </TouchableOpacity>
        </View>


        {/* Error Message */}
        {errorMessage ? (
          <Text style={{ color: 'red', marginBottom: 16 }}>{errorMessage}</Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>POST ITEM</Text>
          </TouchableOpacity>


          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Select Category</Text>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  {categories.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                  ))}
                </Picker>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setSelectedCategoryLabel(`Category: ${category || 'Select Category'}`);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#8fcbbc',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  smallImageContainer: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    width: '30%',
    borderWidth: 1,
    borderColor: 'black',
  },
  smallImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 40,
    width: '100%',
    padding: 8,
    color: 'black',
    fontSize: 16,
    marginBottom:20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 30,
    marginRight: 8,
    color: 'black',
  },
  titleInput: {
    fontSize: 18,
    height: 50,
  },
  multilineInput: {
    height: 80,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: 200,
    height: 60,
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  selectCategoryButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginLeft: 20,
    width: 150
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonClose: {
    backgroundColor: '#8fcbbc',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PostItemScreen;