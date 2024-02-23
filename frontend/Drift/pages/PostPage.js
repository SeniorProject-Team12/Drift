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
import ImagePickerComponent from '../components/ImagePickerComponent.js';
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
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('Select Category');

  const [data, setData] = React.useState([]);
	const API_URL = 'http://10.136.134.161:3000';

  useEffect(() => {
    getPermissionAsync();
  }, []);

  //Image Picker Functions

  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  };

  const selectImage = async () => {
    // If an image is already selected, show options to delete or select a different one
    if (image) {
      Alert.alert(
        'Image Options',
        'Choose an option:',
        [
          {
            text: 'Delete',
            onPress: () => deleteImage(),
            style: 'destructive',
          },
          {
            text: 'Select Different Image',
            onPress: async () => {
              // Reset the current image
              setImage(null);
  
              // Launch the image picker to select a different image
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1], // Square aspect ratio
                quality: 1,
              });
  
              if (!result.canceled) {
                setImage(result.assets[0].uri);
  
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
        setImage(result.assets[0].uri);
  
        // Clear error message when user selects an image
        setErrorMessage('');
      }
    }
  };

  const deleteImage = () => {
    setImage(null);
  };
  
  const chooseDifferentImage = () => {
    // Set the current image to null before selecting a different one
    setImage(null);
  
    // Allow the user to choose a different image
    selectImage();
  };

  //Category Modal Function
  const handleCategoryChange = (itemValue) => {
    setCategory(itemValue);
    setSelectedCategoryLabel(itemValue !== '' ? itemValue : 'Select Category');
  };

  //On Submit Function
  const handleSubmit = () => {
    // Check if at least one image is uploaded and all fields are filled
    if (!image || !description || !price || !brand) {
      setErrorMessage('Please upload an image and fill in all fields before submitting.');
    } else {

      //Eventually send data to back end
      console.log('Image:', image);
      console.log('Description:', description);
      console.log('Price:', price);
      console.log('Brand:', brand)

      // Clear the form and error message after submission
      setImage(null);
      setDescription('');
      setBrand('');
      setPrice('');
      setErrorMessage('');
      setSelectedCategoryLabel('Select Category');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        
      <ImagePickerComponent image={image} selectImage={() => selectImage(setImage, setErrorMessage)} />

        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Describe your item with information about the condition, size, color, and style."
          multiline
          numberOfLines={2}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <Text style={styles.infoHeader}>INFO</Text>
        {/* Category */}
        <TouchableOpacity
          style={styles.categoryContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.categoryLabelText}>Category:</Text>
          <Text style={styles.selectCategoryBar}>{selectedCategoryLabel.toUpperCase()}</Text>
      </TouchableOpacity>

      <View style={styles.inputsContainer}>
        {/* Price */}
        <View style={styles.halfWidthContainer}>
          <Text style={styles.halfWidthLabel}>Price:</Text>
          <TextInput
            style={styles.priceInput}
            keyboardType="numeric"
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
          <Text style={styles.priceUnitText}>USD</Text>
        </View>

        {/* Brand */}
        <View style={styles.halfWidthContainer}>
          <Text style={styles.halfWidthLabel}>Brand:</Text>
          <TextInput
            style={styles.brandInput}
            placeholder="Enter brand"
            value={brand}
            onChangeText={(text) => setBrand(text)}
          />
        </View>
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
                  onValueChange={handleCategoryChange}
                >
                  {categories.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                  ))}
                </Picker>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(!modalVisible)}
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
    //backgroundColor: '#8fcbbc',
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
  infoHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  inputsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10
  },
  halfWidthContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  halfWidthLabel: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  priceInput: {
    flex: 1,
    textAlign: 'right',
    padding: 8,
    color: 'black',
    fontSize: 16,
    marginLeft: 'auto'
  },
  priceUnitText: {
    color: '#888',
    fontSize: 16,
  },
  brandInput: {
    flex: 3,
    padding: 8,
    color: 'black',
    fontSize: 16,
  },
  multilineInput: {
    height: 60,
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
    marginBottom: 40,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  categoryLabelText: {
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectCategoryBar: {
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
    marginLeft: 'auto'
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