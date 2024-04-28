import React, {useState, useEffect} from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, IconButton, Avatar, Button, Text } from 'react-native-paper';
import Products from "./Products";
import testItems from "./testData/testItems";
import * as ImagePicker from 'expo-image-picker';
import ProfileImage from '../components/profileImage.js';
import { Icon } from 'react-native-paper';
import axios from 'axios';
import configs from "../config";
import useUserStore from "../components/UserContext";
import { useIsFocused } from '@react-navigation/native';

const testUser = {
      id: 9,
      name: "Christian Jackson",
      bio: "Looking to give my clothes a second home. Please message me with any questions!",
}

const userID = 1

const ProfilePage = ({navigation}) => {
    const [items, setItems] = useState([]);
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const isFocused = useIsFocused();

    const userID = useUserStore((state) => state.userID);

    const fetchItemsByUserID = async () => {
      
      try {
        {console.log('fetchItemsByUserID')}
        const response = await axios.get(configs[0].API_URL + `/items/getItemsByUserID/userID/${userID}`); 
        setItems(response.data); 
        //console.log(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

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
    useEffect(() => {
        fetchItemsByUserID()
        console.log("profile items", items)
    }, [isFocused]);
    //KIM
    useEffect(() => {

    }, [items]);
    return (
        <View style={styles.container}>
        
          <Appbar.Header  style={{ backgroundColor: 'transparent' }}>
          <IconButton
                title="Settings"
                size={20}
                onPress={() => {
                    navigation.navigate("Settings");
                }}
            />
        </Appbar.Header>

        <View style={styles.profileHeader}>
            {/* <Avatar.Image size={100} source='https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png' /> */}
            <View>
                <ProfileImage image={image} selectImage={() => selectImage(setImage, setErrorMessage)} />
            </View>
            <View style={styles.profileHeaderCol2}>
                <Text variant="headlineLarge">{testUser.name}</Text>
                <Button mode="contained" buttonColor="blue" textColor="white" onPress={() => console.log('Pressed')}>
                    Message user 
                </Button>
            </View>
        </View>
        <Text variant="bodyLarge">{testUser.bio} 
        <Icon
            icon="camera"
            iconColor={'black'}
            size={10}
            onPress={() => console.log('Pressed')}
        />
        </Text>
            
          <Products items={items} navigation={navigation} showInfo={false}/>
        </View>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        backgroundColor: 'white',
        flex: 1
    },
    profileHeader: {
        flexDirection: 'row',
        padding: 10,
         top: 0,
         position: 'absolute',
    },
    profileHeaderCol2: {
        flex: 1, 
        justifyContent: 'center', 
    },
    products: {
        flex: 1,
    }
      
});
