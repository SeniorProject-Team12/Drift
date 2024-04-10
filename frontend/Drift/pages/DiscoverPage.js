import React, { useEffect, useState} from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import Products from "./Products";
import { Appbar } from "react-native-paper";
import testItems from "./testData/testItems";
import axios from 'axios';
import configs from "../config";
import Constants from "expo-constants";
import { useIsFocused } from '@react-navigation/native';


const DiscoverPage = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState([]);
    const isFocused = useIsFocused();

    const onChangeSearch = (keyword) => setSearchQuery(keyword);

    // console.log("discover page")

    const fetchAllItems = async () => {
        try {
            console.log(configs[0].API_URL + '/items/getAllItems') 
            const response = await axios.get(configs[0].API_URL + '/items/getAllItems', { timeout: 30000 });
            // console.log('test')
            // console.log(response.data)
            setItems(response.data); 
        } catch (error) {
            console.error('Error fetching items:', error);
        }
      };

    const fetchSearchResults = async () => {
        try {
            const response = await fetch(configs[0].API_URL + `/items/getItemsByKeyWord?keyword=${searchQuery}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('There was an error fetching the items by keyword:', error);
        }
    };

    useEffect(() => {
        if (searchQuery === "") {
            fetchAllItems();
        }
    }, [isFocused]); 

    useEffect(() => {
    }, [items]); 
    
    return (
        <View style={[styles.container]}>
                <Appbar.Header  style={{ backgroundColor: 'transparent' }}>
                <Searchbar
                    style={{ flex: 1 }}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    onIconPress={fetchSearchResults}
                />
                <IconButton
                    icon="basket"
                    size={20}
                    onPress={() => {
                        navigation.navigate("Cart");
                    }}
                />
                </Appbar.Header>
           
            <Products items={items} navigation={navigation} showInfo={true}/>
      
        </View>
    );
};

export default DiscoverPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
    header: {
        //flexDirection: 'row',
        //alignItems: 'center',
        left: 0,
        right: 0,
        //width: max-width,
        padding: 8,
    }
});