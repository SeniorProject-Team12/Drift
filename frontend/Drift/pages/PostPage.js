import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ImagePickerComponent from '../components/ImagePickerComponent.js';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import configs from '../config.js';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const categories = [
  'Top',
  'Shirt',
  'Sweater',
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
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [postSuccessful, setPostSuccesssful] = useState(false);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('Select Category');

  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getPermissionAsync();
  }, []);

  //Image picker functions

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
        aspect: [1, 1],
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
  
  //Category modal function
  const handleCategoryChange = (itemValue) => {
    setCategory(itemValue);
    setSelectedCategoryLabel(itemValue !== '' ? itemValue : 'Select Category');
  };

  //On submit
  const handleSubmit = async () => {
    // Check if at least one image is uploaded and all fields are filled
    if (/*!image ||*/ !description || !price || !brand) {
      setErrorMessage('Please upload an image and fill in all fields before submitting.');
    } else if (Number.parseInt( price, 10) <= 0) {
      setErrorMessage('Please enter a positive number for the price.');
    } else if (!(/^\d*\.?\d*$/.test(price))) {
      setErrorMessage('Please enter a number for the price.');
    } else {

      try {
        console.log("In POSTITEM w/ ", description, brand, category, price, image, '1');
        const response = await axios.post(configs[0].API_URL + '/items/addNewItem', {
          "description": description,
          "brand": brand,
          "price": price,
          "category": category,
          "photoURL": image,
          "userID": 1 //Update with actual user id
        });
        console.log(response);
        setPostSuccesssful(true);

        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          setPostSuccesssful(false);
          scaleValue.setValue(0);
        }, 2000);


      } catch(error) {
          console.log(error);
      }

      

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
          testID='categoryChange'
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
            type='number'
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
          <TouchableOpacity testID = 'submit-button' style={styles.submitButton} onPress={handleSubmit}>
            <View style = {{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>     POST ITEM</Text>
              <AnimatedIcon
                name={postSuccessful ? 'checkmark-circle' : 'ios-add-circle-outline'}
                size={24}
                color={postSuccessful ? 'green' : 'black'}
                style={{ transform: [{ scale: scaleValue }]}}
                />
            </View>
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
                  testID='categoryChange'
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