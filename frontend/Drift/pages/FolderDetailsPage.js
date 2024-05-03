import React, { useEffect, useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import Products from "./Products";
import testItems from "./testData/testFolders";
import configs from "../config";
import {Button, Portal, Dialog} from "react-native-paper";
import { colors } from "../assets/Colors";

const FolderDetailsPage = ({ route, navigation }) => {
    const [items, setItems] = useState([]);
    const {folder} = route.params;
    const [visible, setVisible] = useState(false)

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

            navigation.navigate('Main', { screen: 'Discover' });
    
            if (!response.ok) {
                const message = await response.text(); 
                throw new Error(`Failed to delete folder: ${message}`);
            }
            return response.text();  
        } catch (error) {
            console.error('Error deleting the folder:', error);
            throw error; 
        }
        hideDialog();
    }

    useEffect(() => {
        fetchSavedItems();
    }, []);
    useEffect(() => {
    }, [items]);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    
    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                buttonColor="white"
                textColor="black"
                onPress={() => showDialog()}
            >
                Delete Folder
            </Button>

            <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={{marginTop: -150}}>
                <Dialog.Title>Delete saved folder?</Dialog.Title>
                <Dialog.Actions>
                <Button textColor={colors.red} onPress={hideDialog}>No</Button>
                <Button textColor={colors.darkBlue} onPress={() => {deleteFolder(); navigation.navigate('Saved');}}>Yes</Button>
                </Dialog.Actions>
            </Dialog>
            </Portal>
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