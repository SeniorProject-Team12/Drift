import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import testFolders from "../pages/testData/testFolders";
import { Checkbox, List } from 'react-native-paper';
import axios from 'axios';
import configs from "../config";

const userID = 1;
const FolderList = ({itemID}) => {
  const [folders, setFolders] = useState([])
  const [checkedFolders, setCheckedFolders] = useState({});
  //fetchAllFolders
  // useEffect(() => {
  //   setFolders(files);
  // }, [files]);

  const getCheckedFolderIDs = (checkedFolders) => {
    return Object.entries(checkedFolders)
      .filter(([_, isChecked]) => isChecked)
      .map(([savedFolderId, _]) => savedFolderID);
  };
  

  const saveItem =  async (checkedFolderIDs) => {
    console.log("saving item")
    try {
        console.log(folderName)
        console.log(userID)
        const response = await axios.post(configs[0].API_URL +`savedItems/addSavedItem`, { itemID: itemID, savedFolderIDs: savedFolderIDs});
   
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const toggleCheckbox = (itemId) => {
    setCheckedItems((currentItems) => ({
      ...currentItems,
      [itemId]: !currentItems[itemId],
    }));
  };

  const deleteSavedItem =  async (checkedFolderIDs) => {
    console.log("delete saved item")
    try {
        console.log(folderName)
        console.log(userID)
        const response = await axios.post(configs[0].API_URL +`savedItems/deleteSavedItem`, { userID: userID, savedFolderIDs: selectedFolderIDs, itemID: itemID});
   
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const fetchSavedFolders = async () => {
    try {
        console.log("fetchingSavedFolders")
        const response = await fetch(configs[0].API_URL +`/savedFolders/getSavedFolders/userID/${userID}`);
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        setFolders(data);
    } catch (error) {
        console.error('There was an error fetching the saved folders:', error);
    }

    useEffect(() => {
      console.log("useEffect fetchSavedFolders")
      fetchSavedFolders()
    }, []);
    
    useEffect(() => {
      console.log("folderlist folders: ", folders)
    }, [folders]);   
};

  const renderFolder = ({ item }) => {
    return <View>
    <Checkbox.Item label={item.folderName} status="checked" />
  </View>
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
            data={folders}
            keyExtractor={(item) => item.savedFolderID}
            renderItem={({ item }) => (
              <List.Item
                title={item.folderName}
                left={() => (
                <Checkbox
                  status={checkedItems[item.id] ? 'checked' : 'unchecked'}
                  onPress={() => toggleCheckbox(item.savedFolderID)}
                />
              )}
            />
          )}
        />

        
    </View>
  );
};

export default FolderList;