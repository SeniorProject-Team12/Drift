import React from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const OrdersPage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30}}>
                Orders Page
            </Text>
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