import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import Products from "./Products";


const DiscoverPage = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState("");
    const onChangeSearch = (query) => setSearchQuery(query);

    return (
        <View style={[styles.container, { flexDirection: 'row' }]}>
            <Searchbar
                style={{ flex: 1, flexDirection: 'row'}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <IconButton
                icon="basket"
                // iconColor={appTheme.colors.darkBlue}
                size={20}
                onPress={() => {
                    navigation.navigate("Cart");
                }}
            />
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
});