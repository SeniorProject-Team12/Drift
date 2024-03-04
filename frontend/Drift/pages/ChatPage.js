import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';

const ChatPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Chat Page</Text>
            
        </View>
    );
};

export default ChatPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});