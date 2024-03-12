import React, { useEffect, useState} from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import Products from "./Products";
import { Appbar } from "react-native-paper";
import testItems from "./testData/testItems";
import axios from 'axios';

import Constants from "expo-constants";


const DiscoverPage = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState([]);

    const onChangeSearch = (keyword) => setSearchQuery(keyword);

    console.log("discover page")

    const fetchAllItems = async () => {
      
        try {
            {console.log('fetchAllItems')}
            const response = await axios.get(`https://long-waves-share.loca.lt/items/getAllItems`); 
            setItems(response.data); 
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching items:', error);
          }
      
    };

    useEffect(() => {

        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`https://long-waves-share.loca.lt/items/getItemsByKeyWord?keyword=${searchQuery}`);
                if (!response.ok) throw new Error('Network response was not ok.');
                const data = await response.json();
                setItems(data);
                console.log("fetchSearchREsults",data)
            } catch (error) {
                console.error('There was an error fetching the items by keyword:', error);
            }
        };
        if (searchQuery === "") {
            fetchAllItems();
        } else {
            fetchSearchResults();
        }
    }, [searchQuery]); // This effect runs whenever the 'keyword' changes.
      
    
    // const fetchItemByKeyword= async (searchQuery) => {
    
    //   searchQuery = searchQuery.toLowerCase();
    
    //   const filteredItems = testItems.filter((item) => {
    //     const name = item.name.toLowerCase();
    //     const brand = item.brand.toLowerCase();
    //     const category = item.category.toLowerCase();
    
    //     return (
    //       name.includes(searchQuery) ||
    //       brand.includes(searchQuery) ||
    //       category.includes(searchQuery)
    //     );
    //   });
    //   setItems(filteredItems)
    // }

    // useEffect(() => {
    //     if (searchQuery === "") {
    //         fetchAllItems();
    //     } else {
    //         fetchItemByKeyword(searchQuery);
    //     }
    // }, [searchQuery])

    return (
        <View style={[styles.container]}>
                <Appbar.Header  style={{ backgroundColor: 'transparent' }}>
                <Searchbar
                    style={{ flex: 1 }}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
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