import React, {useState, useEffect} from "react";
import { StyleSheet, View } from 'react-native';
import { Appbar, IconButton, Avatar, Button, Text } from 'react-native-paper';
import Products from "./Products";
import testItems from "./testData/testItems";


const testUser = {
      id: 1,
      name: "John Doe",
      bio: "Looking to give me clothes a 2nd home. Please message me with any questions",
}

const ProfilePage = ({navigation}) => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(testItems);
    }, []);
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
            <Avatar.Image size={100} source='https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png' />
            <Text variant="headlineLarge">{testUser.name}</Text>
            <Text variant="bodyLarge">{testUser.bio}</Text>
            <Button mode="contained" buttonColor="white" textColor="black" onPress={() => console.log('Pressed')}>
                Message user
            </Button>
            <Products items={items} navigation={navigation} showInfo={false} />
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