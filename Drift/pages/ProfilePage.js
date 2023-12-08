import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';

const ProfilePage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Profile Page</Text>
            <Button 
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});