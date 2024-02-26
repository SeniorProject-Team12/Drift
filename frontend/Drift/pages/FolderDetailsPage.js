import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import Products from "./Products";


const FolderDetailsPage = ({folder, navigation}) => {
    
    return (
        <View style={styles.container}>
            <Text>{folder.name}</Text>

            {/* <Products items={folder.items} navigation={navigation} showInfo={true} /> */}
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