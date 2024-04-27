import React, { useEffect, useState} from "react";
import { StyleSheet, Text, View} from 'react-native';
import Products from "./Products";
import testItems from "./testData/testFolders";
import configs from "../config";
import {Button} from "react-native-paper";


const FolderDetailsPage = ({ route, navigation }) => {
    const [items, setItems] = useState([]);
    const {folder} = route.params;

    const fetchSavedItems = async () => {
        try {
            console.log("trying to fetch items", folder.savedFolderID)
            console.log("URL ", configs[0].API_URL + `/savedItems/getSavedItems/savedFolderID/${folder.savedFolderID}`)
            const response = await fetch(configs[0].API_URL + `/savedItems/getSavedItems/savedFolderID/${folder.savedFolderID}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    const deleteFolder = async () => {
        console.log(configs[0].API_URL + `/savedFolders/deleteSavedFolder/${folder.savedFolderID}`)
        try {
            const response = await fetch(configs[0].API_URL + `/savedFolders/deleteSavedFolder/${folder.savedFolderID}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) {
                const message = await response.text(); 
                throw new Error(`Failed to delete folder: ${message}`);
            }
            return response.text();  
        } catch (error) {
            console.error('Error deleting the folder:', error);
            throw error; 
        }
    }

    useEffect(() => {
        fetchSavedItems();
    }, []);
    useEffect(() => {
    }, [items]);
    
    return (
        <View style={styles.container}>
            <Text>{folder.folderName}</Text>
            <Button
                mode="contained"
                buttonColor="white"
                textColor="black"
                onPress={deleteFolder}
            >
                Delete Folder
            </Button>
            <Products items={items} numCols={2} navigation={navigation} showInfo={false} />
        </View>
    );
};

export default FolderDetailsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});