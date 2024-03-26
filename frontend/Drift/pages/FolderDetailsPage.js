import React, { useEffect, useState} from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import Products from "./Products";
import testItems from "./testData/testFolders";
import configs from "../config";


const FolderDetailsPage = ({ route, navigation }) => {
    const [items, setItems] = useState([]);
    const {folder} = route.params;
    const fetchSavedItems = async () => {
        try {
            console.log("trying to fetch items", folder.savedFolderID)
            const response = await fetch(configs[0].API_URL + `savedItems/getSavedItems/savedFolderID/${folder.savedFolderID}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    useEffect(() => {
        fetchSavedItems();
    }, []);
    useEffect(() => {
    }, [items]);
    
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