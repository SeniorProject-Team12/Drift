import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const DiscoverAdminPage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30}}>
                Discover Admin Page
            </Text>
        </SafeAreaView>
    );
}

export default DiscoverAdminPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});