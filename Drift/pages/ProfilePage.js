import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';

const ProfilePage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Appbar.Header  style={{ backgroundColor: 'transparent' }}>
            <IconButton
                    title="Settings"
                    size={20}
                    onPress={() => {
                        navigation.navigate("Settings");
                    }}
                />
            </Appbar.Header>
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