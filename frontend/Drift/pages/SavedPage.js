import React, {useState, useEffect} from "react";
import { StyleSheet, View, Pressable } from 'react-native';
import Folders from "./Folders";
import { Text, Button, Divider, Portal, Dialog, TextInput } from 'react-native-paper';
import testFolders from "./testData/testFolders";
import axios from 'axios';
import configs from "../config";

const userID = 1

const SavedPage = ({navigation}) => {
    const [savedFolders, setSavedFolders] = React.useState([]);
    const [newFolderName, setNewFolderName] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    const fetchSavedFolders = async () => {
        try {
            const response = await fetch(configs[0].API_URL +`/savedFolders/getSavedFolders/userID/${userID}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            setSavedFolders(data);
        } catch (error) {
            console.error('There was an error fetching the saved folders:', error);
        }
    };

    useEffect(() => {
        fetchSavedFolders()
    }, []);
    useEffect(() => {
    }, [savedFolders]); 

    const addFolder =  async () => {
        const newFolder = {
            id: savedFolders.length > 0 ? Math.max(...savedFolders.map(folder => folder.id)) + 1 : 1,
            name: newFolderName,
            items: []
        };

        try {
            const response = await axios.post(configs[0].API_URL +'savedFolders/insertSavedFolder', newFolder);
            setSavedFolders([...savedFolders, newFolder]);
        } catch (error) {
            console.error('Error:', error);
        }
        setNewFolderName('');
        hideDialog();
    };

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <View style={styles.container}>
            <Text variant="displaySmall">Your Saved Items</Text>


            <Button mode="contained" buttonColor="white" textColor="black" onPress={() => showDialog()}>
                Create a Folder
            </Button>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Create a new folder</Dialog.Title>
                    <TextInput
                            label="Folder Name"
                            value={newFolderName}
                            onChangeText={newFolderName => setNewFolderName(newFolderName)}
                    />
                    <Dialog.Actions>
                    <Button onPress={addFolder}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Divider bold="true"/>
            <Folders files={savedFolders} navigation={navigation}/>
        </View>
    );
};

export default SavedPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});