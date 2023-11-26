import React from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";

const SettingsPage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30}}>
                Settings Page
            </Text>
        </SafeAreaView>
    );
}

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});