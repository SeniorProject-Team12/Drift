import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import {
  Button,
  Card,
  IconButton,
  Portal,
  Dialog,
} from "react-native-paper";
import { useCart } from "../components/CartContext";
import axios from "axios";
import configs from "../config";
import FolderList from "../components/FolderList"
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import useUserStore from "../components/UserContext";
import { colors } from "../assets/Colors";

const ItemPage = ({ route, navigation }) => {
  const [folders, setFolders] = React.useState([]);
  const [isSaved, setIsSaved] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [checkedFolders, setCheckedFolders] = useState([]);
  const [seller, setSeller] = useState(null);
  const userID = useUserStore((state) => state.userID);

  const showDialog = () => setVisible(true);

  const deleteItem = async () => {
    try {
        const response = await fetch(configs[0].API_URL + `/items/deleteItem/${item.itemID}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const message = await response.text(); 
            throw new Error(`Failed to delete item: ${message}`);
        }

        //navigation.navigate('Main', { screen: 'Discover' });
        navigation.navigate("Main");

        return response.text();  
    } catch (error) {
        console.error('Error deleting the item:', error);
        throw error; 
    }
}


  const fetchUserByUserID = async () => {
    try {
      const response = await axios.get(
        configs[0].API_URL + `/user/getUser/userID/${item.userID}`
      );
      setSeller(response.data[0].username);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

    const handleAddToCart = () => {
      // Check if the userID of the item matches the userID stored in the context
      if (item.userID === userID) {
        alert("You can't add your own item to cart.");
      } else {
        // If the userID doesn't match, add the item to cart
        dispatch({ type: 'ADD_TO_CART', item });
      }
    };
  const hideDialog = () => {
    saveItem(item.itemID, checkedFolders);
    setIsSaved(1);
    setVisible(false);
  };

  const { item } = route.params;
  const { dispatch } = useCart();
  const toggleCheckBox = (savedFolderID) => {
    setCheckedFolders((current) => {
      const index = checkedFolders.indexOf(savedFolderID);
      return index !== -1
        ? checkedFolders.filter((id) => id !== savedFolderID)
        : [...checkedFolders, savedFolderID];
    });
  };

  const fetchSavedFolders = async () => {
    try {
      const response = await fetch(
        configs[0].API_URL + `/savedFolders/getSavedFolders/userID/${userID}`
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      console.log("Fetched folders a -> ", data);
      setFolders(data);
    } catch (error) {
      console.error("There was an error fetching the saved folders:", error);
    }
  };

  const fetchIsSaved = async () => {
    try {
      const response = await axios.get(
        configs[0].API_URL +
          `/savedItems/isSaved/userID/${userID}/itemID/${item.itemID}`
      );
      setIsSaved(response.data[0][0].ItemExists);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {}, [isSaved]);

  const toggleSaveBtn = () => {
    if (isSaved) {
      setIsSaved(0);
    } else {
      fetchSavedFolders();
      showDialog();
    }
  };

  useEffect(() => {
    fetchUserByUserID();
    fetchIsSaved();
  }, []);

  useEffect(() => {}, [folders]);

  const saveItem = async (itemID, checkedFolders) => {
    const savedFolderIDs = checkedFolders.join(",");
    try {
      if (savedFolderIDs != "") {
        const response = await axios.post(
          configs[0].API_URL + "/savedItems/addSavedItem",
          {
            itemID,
            savedFolderIDs,
          }
        );
        if (response.status === 201) {
          console.log("Saved item successfully added:", response.data);
          return response.data;
        } else {
          console.log("Failed to add saved item:", response.status);
          return null;
        }
      }
    } catch (error) {
      console.error("Error adding saved item:", error);
      throw error;
    }
  };

  const handleReport = async () => {
    console.log("item report button pressed!");
    try {
      Alert.alert(
        "Report Item Post",
        "Are you sure you want to report this post?",
        [
          {
            text: "YES",
            onPress: async () => {
              try {
                const response = await axios.post(
                  configs[0].API_URL + "/items/report/id/" + item.itemID
                );
                alert(
                  "This post has just been reported and will be reviewed by admin!"
                );
              } catch (e) {
                console.error("Error reporting posted item:", e);
              }
            },
          },
          {
            text: "NO",
            onPress: () => console.log("No Pressed"),
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      console.error("Error reporting posted item:", error);
    }
  };

  return (
    <View
      style={{
        paddingTop: 40,
        paddingBottom: 30,
      }}
    >
      <Card style={{ borderRadius: 15 }} elevation={0}>
        <Image
          source={{
            uri: item.photoURL,
          }}
          style={{ width: "100%", height: 300 }}
          resizeMode="cover"
        />
        {item.userID != userID && (
          <Card.Actions style={{ flexDirection: "row", paddingBottom: 10 }}>
            <IconButton
              icon="bookmark"
              mode="contained-tonal"
              iconColor={isSaved ? colors.yellow : colors.white}
              backgroundColor={isSaved ? colors.white : colors.yellow}
              size={30}
              onPress={() => toggleSaveBtn()}
            />

            <IconButton
              icon="chat"
              mode="contained-tonal"
              iconColor={colors.lightBlue}
              backgroundColor={colors.white}
              size={30}
              onPress={() =>
                navigation.navigate("Conversation", {
                  receiverID: String(item.userID),
                })
              }
            />

            <IconButton
              icon="alert"
              mode="contained-tonal"
              iconColor={colors.red}
              backgroundColor={colors.white}
              size={30}
              onPress={() => handleReport()}
            />

            <Button
              style={{ borderColor: colors.brown }}
              textColor={colors.brown}
              buttonColor={colors.white}
              mode="outlined"
              onPress={() =>
                navigation.navigate("User Profile", { userID: item.userID })
              }
            >
              More from {seller}
            </Button>
          </Card.Actions>
        )}

        <Card.Title
          style={{ paddingTop: 10, paddingBottom: 10, fontWeight: "bold" }}
          title={item.brand + ' - '+ item.category}
          subtitle={seller}
          titleVariant="headlineMedium"
          subtitleVariant="titleLarge"
        />

        <Card.Content
          style={{
            height: "25%",
            flexDirection: "column",
            gap: "5px",
            paddingTop: 10,
          }}
        >
          <Text variant="labelLarge">
            <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
              Brand:
            </Text>{" "}
            {item.brand}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Category:</Text>{" "}
            {item.category}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Price:</Text> ${item.price} USD
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
            {item.description}
          </Text>
        </Card.Content>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{backgroundColor: colors.white}}>
            <Dialog.Title>Save to:</Dialog.Title>
            {folders.map((folder) => (
              <Button
                key={folder.savedFolderID}
                mode={
                  checkedFolders.includes(folder.savedFolderID)
                    ? "contained"
                    : "outlined"
                }
                buttonColor={
                  checkedFolders.includes(folder.savedFolderID)
                    ? colors.yellow
                    : colors.white
                }
                textColor={colors.black}
                onPress={() => toggleCheckBox(folder.savedFolderID)}
                style={{ marginBottom: 8, marginHorizontal: 30 }} // Adds space between buttons
              >
                {folder.folderName}
              </Button>
            ))}
            <Dialog.Actions>
              <Button onPress={hideDialog} textColor={colors.darkBlue}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Card.Actions style={{ justifyContent: "space-between" }}>
          {item.userID == userID ? (
            <Button
              textColor={colors.orange}
              buttonColor={colors.white}
              mode="outlined"
              style={{ flex: 1, marginRight: 4, borderColor: colors.orange }}
            >
              Edit
            </Button>
          ) : (
            <Button
              textColor={colors.orange}
              buttonColor={colors.white}
              mode="outlined"
              style={{ flex: 1, marginRight: 4, borderColor: colors.orange, marginTop: -60 }} // Use marginRight to add spacing between buttons
            >
              Offer
            </Button>
          )}

          {item.userID == userID ? (
            <Button
              textColor="white"
              buttonColor={colors.red}
              mode="contained"
              style={{ flex: 1, marginLeft: 4 }} // Use marginLeft to add spacing between buttons
              onPress={deleteItem}
            >
              Delete
            </Button>
          ) : (
            <Button
              textColor="white"
              buttonColor={colors.orange}
              mode="contained"
              style={{ flex: 1, marginLeft: 4, marginTop: -60 }} // Use marginLeft to add spacing between buttons
              onPress={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
        </Card.Actions>
      </Card>
    </View>
  );
};

const itemInfo = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around", // Ensures that space is evenly distributed around each element
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 5, // Adds horizontal padding around the separator for better spacing
  },
});

export default ItemPage;
