import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';

const PostPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Post Page</Text>
            <Button 
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default PostPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});