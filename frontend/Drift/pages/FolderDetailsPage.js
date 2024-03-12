import React, { useEffect, useState} from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import Products from "./Products";
import testItems from "./testData/testFolders";
import axios from 'axios'

const baseURL = "https://"

const FolderDetailsPage = ({ route, navigation }) => {
    const [items, setItems] = useState([]);
    const {folder} = route.params;
    async function fetchItemIDs(savedFolderID) {
        try {
            const response = await axios.get(`${baseURL}/getSavedItems/savedFolderID/${savedFolderID}`);
            return response.data
        } catch (error) {
            console.error("Error fetching items:", error);
            return [];
        }
    }

    async function fetchItemsByItemID(itemIDs) {
        try {
            const fetchPromises = itemIDs.map(itemID =>
                axios.get(`${baseURL}/items/getItems/itemID/${itemID}`).then(response => response.data)
            );
    
            const itemsByItemID = await Promise.all(fetchPromises);
    
            setItems(itemsByItemID)
        } catch (error) {
            console.error("Error fetching item details:", error);
            return [];
        }
    }

    useEffect(() => {
        fetchItemIDs(folder.savedFolderID).then(fetchItemsByItemID);
    }, [folder.savedFolderID]);
    
    return (
        <View style={styles.container}>
            <Text>{folder.name}</Text>
            <Products items={items} navigation={navigation} showInfo={false} />
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