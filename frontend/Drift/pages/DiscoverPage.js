import React, { useEffect, useState} from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import Products from "./Products";
import { Appbar } from "react-native-paper";
import testItems from "./testData/testItems";

const DiscoverPage = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const onChangeSearch = (query) => setSearchQuery(query);
    const [items, setItems] = useState([]);

    console.log("discover page")

    const fetchAllItems = async () => {
        // try {
        //   {console.log('fetchAllItems', query)}
        //   const response = await axios.get('/items/getAllItems'); 
        //   setItems(response.data); 
        // } catch (error) {
        //   console.error('Error fetching items:', error);
        // }
        setItems(testItems)
      };
    
    const fetchItemByKeyword= async (searchQuery) => {
    
      searchQuery = searchQuery.toLowerCase();
    
      const filteredItems = testItems.filter((item) => {
        const name = item.name.toLowerCase();
        const brand = item.brand.toLowerCase();
        const category = item.category.toLowerCase();
    
        return (
          name.includes(searchQuery) ||
          brand.includes(searchQuery) ||
          category.includes(searchQuery)
        );
      });
      setItems(filteredItems)
    }

    useEffect(() => {
        if (searchQuery === "") {
            fetchAllItems();
        } else {
            fetchItemByKeyword(searchQuery);
        }
    }, [searchQuery])

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