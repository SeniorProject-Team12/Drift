import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import UserAccounts from "./UserAccounts";

const AccountsPage = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={{ fontSize: 26, marginLeft: 35 }}>
                Accounts Management Page
            </Text> */}
            <UserAccounts navigation={navigation} />
        </SafeAreaView>
    );
}

export default AccountsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});