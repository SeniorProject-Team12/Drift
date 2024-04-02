import axios from "axios";
import React from "react";
import { Alert, Button, Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import configs from "../../config";

const SelectedItemPostPage = ({ route }) => {
    console.log("Selected Item Post PAGE");

    const { item } = route.params;
    console.log(item);

    const navigation = useNavigation();
    React.useEffect(() => {
       navigation.getParent()?.setOptions({
         headerShown: false,
       });
       return () =>
         navigation.getParent()?.setOptions({
           headerShown: true,
         });
    }, [navigation]);

    const handleDeletePost = async () => {
        console.log("pressed post delete")
        Alert.alert("Delete Item Post","Are you sure you want to delete this post?", [
            {
                text: 'YES', onPress: async () => {
                try{
                    const res = await axios.delete(configs[0].API_URL + '/items/deleteItem/id/' + item.itemID);
                    console.log(configs[0].API_URL + '/items/deleteItem/id/' + item.itemID);
                    alert("Item Posting has been deleted!");
                    navigation.navigate("Admin Discover");
                } catch(e) {
                    console.error('Error reporting posted item:', e);
                }
            }},
            {
              text: 'NO',
              onPress: () => console.log('No Pressed'),
              style: 'cancel',
            },
        ]);
    };

    return (
        <View>
            <Card style={{ borderRadius: 15 }} elevation={0}>
                <Image
                    source={{
                        uri: item.photoURL
                    }}
                    style={{ width: "100%", height: 300 }}
                    resizeMode="cover"
                />

                <Card.Title title={item.brand + ' - '+ item.category} subtitle={item.sellerId} />

                <Card.Content
                    style={{ height: "25%", flexDirection: "column", gap: "5px", marginBottom: 20 }}
                >
                    <Text>{item.price} USD</Text>
                    <Text>{item.description}</Text>
                    <Text style={{ marginTop: 20 }}>Seller's User ID - {item.userID}</Text>
                    <Text style={{ marginTop: 20, fontWeight: '800', color: 'red' }}>Times Post has been Reported - {item.reportedCount}</Text>

                </Card.Content>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'red',
                            padding: 20,
                            width: '50%',
                            borderRadius: 10,
                            marginLeft: 95
                        }}
                        onPress={() => { handleDeletePost() }}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 26,
                                textAlign: 'center',
                                alignContent: 'center',
                            }}>
                                Delete Post
                        </Text>
                </TouchableOpacity>
            </Card>
        </View>
    );
};

export default SelectedItemPostPage;