import React from "react";
import { StyleSheet, View, Pressable } from 'react-native';
import Folders from "./Folders";
import { Text, Button, Divider, Portal, Dialog, TextInput } from 'react-native-paper';
import testFolders from "./testData/testFolders";
const SavedItemsPage = ({navigation}) => {
    const [savedFolders, setSavedFolders] = React.useState(testFolders);
    const [newFolderName, setNewFolderName] = React.useState("");
    const [visible, setVisible] = React.useState(false);


    const addFolder = () => {
        // Create a new folder object
        const newFolder = {
            id: savedFolders.length > 0 ? Math.max(...savedFolders.map(folder => folder.id)) + 1 : 1, // Generate a unique ID
            name: newFolderName,
            items: []
        };
    
        // Update the savedFolders state to include the new folder
        setSavedFolders([...savedFolders, newFolder]);
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
            <Folders folders={savedFolders} navigation={navigation}/>
        </View>
    );
};

export default SavedItemsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});