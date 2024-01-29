import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import Products from "./Products";
import { Appbar } from "react-native-paper";

const DiscoverPage = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState("");
    const onChangeSearch = (query) => setSearchQuery(query);

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
           
            {console.log('Search Query: in Discover', searchQuery)}
            <Products query={searchQuery} navigation={navigation} />
      
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