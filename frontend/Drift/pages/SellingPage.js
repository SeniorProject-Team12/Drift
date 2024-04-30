import React from "react";
// import axios from 'axios';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Selling from './Selling'

const SellingPage = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30, paddingTop: 10}}>
                Sold Items
            </Text>
            <Selling navigation={navigation} />
        </SafeAreaView>
    );
}

export default SellingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});