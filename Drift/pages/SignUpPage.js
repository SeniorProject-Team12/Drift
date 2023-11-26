import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';

const SignUpPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Sign Up Page</Text>
            <Button 
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
            <Button 
                title="Already have an accout? Login."
                onPress={() => navigation.navigate('LoginPage')}
            />
        </View>
    );
};

export default SignUpPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});