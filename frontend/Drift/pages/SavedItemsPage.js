import React from "react";
import { StyleSheet, View, Pressable } from 'react-native';
import Folders from "./Folders";
import { Text, Button, Divider, Portal, Dialog, TextInput } from 'react-native-paper';


const SavedItemsPage = ({navigation}) => {
    const [savedFolders, setSavedFolders] = React.useState([]);
    const folderItems = [{id: 1,name: "pants"},{id: 2,name: "shirts"}, {id: 3, name: "shoes"}, {id: 4, name: "bags"}, {id: 5, name: "jackets"}, {id: 6, name: "accessories"}, {id: 7, name: "dresses"}]
    const [newFolderName, setNewFolderName] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    // const showModal = () => setVisible(true);
    // const hideModal = () => setVisible(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20};

    // useEffect(() => {
    //   }, [visible]);

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
                    <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Divider bold="true"/>
            <Folders folders={folderItems} navigation={navigation}/>
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