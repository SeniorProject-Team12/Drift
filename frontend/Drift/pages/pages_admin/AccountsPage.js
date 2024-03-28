import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const AccountsPage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30}}>
                Accounts Management Page
            </Text>
        </SafeAreaView>
    );
}

export default AccountsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});