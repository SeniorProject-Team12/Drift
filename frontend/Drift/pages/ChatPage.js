import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';

const ChatPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Chat Page</Text>
            <Button 
                title="Go to chat screen...again"
                onPress={() => navigation.push('Chat')}
            />
            <Button 
                title="Go to discover screen..."
                onPress={() => navigation.navigate('Discover')}
            />
            <Button 
                title="Go back..."
                onPress={() => navigation.goBack()}
            />
            <Button 
                title="Go to the first screen..."
                onPress={() => navigation.popToTop()}
            />
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