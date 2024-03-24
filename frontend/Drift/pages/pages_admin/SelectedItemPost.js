import React from "react";
import { Button, Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

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
                    style={{ height: "25%", flexDirection: "column", gap: "5px" }}
                >
                    <Text>{item.price} USD</Text>
                    <Text>{item.description}</Text>
                    <Text style={{ marginTop: 20 }}>Seller's User ID - {item.userID}</Text>

                </Card.Content>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'red',
                            padding: 20,
                            width: '50%',
                            borderRadius: 10,
                            marginLeft: 95
                        }}
                        onPress={() => {  }}>
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