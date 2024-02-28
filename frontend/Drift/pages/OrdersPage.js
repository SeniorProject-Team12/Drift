import React from "react";
// import axios from 'axios';
import Orders from './Orders';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const OrdersPage = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30}}>
                Your Orders
            </Text>
            <Orders navigation={navigation} />
        </SafeAreaView>
    );
}

export default OrdersPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});