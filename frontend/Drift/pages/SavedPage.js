import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, KeyboardAvoidingView } from "react-native";
import Folders from "./Folders";
import { useIsFocused } from "@react-navigation/native";
import {
  Text,
  Button,
  Divider,
  Portal,
  Dialog,
  TextInput,
} from "react-native-paper";
import axios from "axios";
import configs from "../config";
import { colors } from "../assets/Colors";
import useUserStore from "../components/UserContext";

const SavedPage = ({ navigation }) => {
  const [savedFolders, setSavedFolders] = React.useState([]);
  const [newFolderName, setNewFolderName] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const isFocused = useIsFocused();
  const userID = useUserStore((state) => state.userID);
  const fetchSavedFolders = async () => {
    try {
      const response = await fetch(
        configs[0].API_URL + `/savedFolders/getSavedFolders/userID/${userID}`
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      setSavedFolders(data);
    } catch (error) {
      console.error("There was an error fetching the saved folders:", error);
    }
  };

  useEffect(() => {
    fetchSavedFolders();
  }, [isFocused]);
  useEffect(() => {}, [savedFolders]);

  const addFolder = async () => {
    console.log("adding folder");
    try {
      console.log("newFolderName", newFolderName);
      console.log(userID);
      if(newFolderName != ''){
        const response = await axios.post(
          configs[0].API_URL + `/savedFolders/addSavedFolder`,
          { userID: userID, folderName: newFolderName }
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setNewFolderName("");
    fetchSavedFolders();
    hideDialog();
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  return (
    <View style={styles.container}>
      {/* <Text variant="displaySmall">Your Saved Items</Text> */}

      <Button
        mode="contained"
        buttonColor="white"
        textColor="black"
        onPress={() => showDialog()}
      >
        Create a Folder
      </Button>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{marginTop: -150}}>
            <Dialog.Title>Create a new folder</Dialog.Title>
            <TextInput
              label="Folder Name"
              value={newFolderName}
              onChangeText={(newFolderName) => setNewFolderName(newFolderName)}
            />
            <Dialog.Actions>
              <Button textColor={colors.darkBlue} onPress={addFolder}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

      <Divider bold="true" />
      <Folders files={savedFolders} navigation={navigation} />
    </View>
  );
};

export default SavedPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
    paddingHorizontal: '10',
  },
});
