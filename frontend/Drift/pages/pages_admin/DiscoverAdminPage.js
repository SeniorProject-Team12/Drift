import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { Appbar } from "react-native-paper";
import Posts from "./Posts";

const DiscoverAdminPage = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState("");
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
                </Appbar.Header>
           
            {console.log('Search Query: in Discover ADMIN', searchQuery)}
            <Posts query={searchQuery} navigation={navigation} />
      
        </View>
    );
}

export default DiscoverAdminPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
    header: {
        left: 0,
        right: 0,
        padding: 8,
    }
});