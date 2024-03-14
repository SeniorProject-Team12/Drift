import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const ChatAdminPage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30}}>
                Chat Admin Page
            </Text>
        </SafeAreaView>
    );
}

export default ChatAdminPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});