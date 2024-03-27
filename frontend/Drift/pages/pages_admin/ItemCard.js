import * as React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
// import SelectedItemPage from "";

const ItemCard = ({ item, cardWidth, showInfo, navigation }) => {
    console.log("Admin Item card rendered w/", item);
    const showReported = item.reportedCount > 0;

    return(
        <TouchableOpacity
            style={{ width: cardWidth }}
            onPress={() => {
            navigation.navigate("Selected Item Post", {item: item});
            }}
        >
            <Card elevation={0}>
                <Card.Content>
                    {showReported && <Text style={{ color: 'red' }}>REPORTED ITEM</Text>}
                    <Image
                        source={{
                        uri: item.photoURL
                        }}
                        style={{ width: "100%", height: 100 }}
                        resizeMode="cover"
                    />
                    {showInfo && <Text>{`${item.brand} - ${item.category} $${item.price}`}</Text>}
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

export default ItemCard;