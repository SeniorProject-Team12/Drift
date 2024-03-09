import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import Products from "./Products";
import testItems from "./testData/testFolders";


const FolderDetailsPage = ({ route, navigation }) => {
    

    const {folder} = route.params;
    
    return (
        <View style={styles.container}>
            <Text>{folder.name}</Text>

            {/* <Products items={folder.items} navigation={navigation} showInfo={true} /> */}
            <Products items={testItems} navigation={navigation} showInfo={false} />
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