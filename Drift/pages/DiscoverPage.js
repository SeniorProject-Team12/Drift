import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';

const DiscoverPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Discover Page</Text>
            <Button 
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default DiscoverPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});