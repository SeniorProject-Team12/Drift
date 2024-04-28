import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Appbar,
  IconButton,
  Avatar,
  Button,
  Text,
  Card,
  Divider,
  Portal,
  Dialog,
  TextInput,
} from "react-native-paper";
import Products from "./Products";
import testItems from "./testData/testItems";
import * as ImagePicker from "expo-image-picker";
import ProfileImage from "../components/profileImage.js";
import axios from "axios";
import configs from "../config";
import { useIsFocused } from "@react-navigation/native";
import useUserStore from "../components/UserContext";
import { colors } from "../assets/Colors";

const ProfilePage = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [bio, setBio] = useState(null);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const isFocused = useIsFocused();
  const userID = useUserStore((state) => state.userID);
  const username = useUserStore((state) => state.username);
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const name = firstName + " " + lastName;

  const fetchProfileByUserID = async () => {
    try {
      {
        console.log("fetchProfileByUserID");
      }
      const response = await axios.get(
        configs[0].API_URL + `/profile/getProfile/userID/${userID}`
      );
      setImage(response.data[0].photo);
      setBio(response.data[0].bio);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchItemsByUserID = async () => {
    try {
      {
        console.log("fetchItemsByUserID");
      }
      const response = await axios.get(
        configs[0].API_URL + `/items/getItemsByUserID/userID/${userID}`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const updatePhoto = async(photo_url) => {
    try {
      await axios.post(configs[0].API_URL + '/profile/updatePhoto/userID/' + userID, {
        photo: photo_url
      });
    } catch(error) {
      console.error("Error updating profile photo: ", error);
    }
  }

  const editBio = async (newBio) => {
    try {
      const response = await axios.post(
        configs[0].API_URL + `/profile/updateBio/userID/${userID}`,
        {
          newBio,
        }
      );
      if (response.status === 201) {
        console.log("Bio successfully ipdated:", response.data);
        return response.data;
      } else {
        console.log("Failed to update profile:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
    hideDialog();
  };

  const selectImage = async () => {
    // If an image is already selected, show options to delete or select a different one
    if (image) {
      Alert.alert(
        "Image Options",
        "Choose an option:",
        [
          {
            text: "Delete",
            onPress: () => deleteImage(),
            style: "destructive",
          },
          {
            text: "Select Different Image",
            onPress: async () => {
              setImage(null);
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1], 
                quality: 1,
              });

              if (!result.canceled) {
                setImage(result.assets[0].uri);
                updatePhoto(result.assets[0].uri);
                setErrorMessage("");
              }
            },
          },
          {
            text: "Cancel",
            style: "cancel",
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
        updatePhoto(result.assets[0].uri);
        // Clear error message when user selects an image
        setErrorMessage("");
      }
    }
  };

  const deleteImage = () => {
    setImage(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchProfileByUserID();
      await fetchItemsByUserID();
      console.log("profile items", items);
    };
  
    fetchData();
  }, [isFocused]);
  //KIM
  useEffect(() => {}, [items]);
  return (
    <View style={[styles.container]}>
      <Appbar.Header style={{ backgroundColor: "transparent" }}>
        <IconButton
          title="Settings"
          size={20}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        />
      </Appbar.Header>

      <View style={styles.profileHeader}>
        <ProfileImage
          image={image}
          selectImage={() => selectImage(setImage, setErrorMessage)}
        />
        <Card.Title
          title={name}
          titleVariant="headlineMedium"
          subtitle={username}
          subtitleVariant="labelLarge"
          style={styles.profileHeaderCol2}
          right={(props) => (
            <IconButton
              icon="lead-pencil"
              iconColor={colors.darkBlue}
              onPress={() => showDialog()}
            />
          )}
        />
      </View>
      <Card.Content>
        <Text>{bio}</Text>
      </Card.Content>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Edit Bio</Dialog.Title>
          <TextInput
            label="Bio"
            value={bio}
            onChangeText={(bio) => setBio(bio)}
          />
          <Dialog.Actions>
            {/* <Button onPress={editBio}>Done</Button> */}
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Products items={items} navigation={navigation} showInfo={false} />
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
