import React from 'react';
import { View, Text, Image } from "react-native";
import { Button, Card } from "react-native-paper";

const SelectedOrderPage = ({ route }) => {
    console.log("Selected Order PAGE");

    const { item } = route.params;
    console.log(item);

    return(
        <View>
            <Text>Order Page</Text>
            <Card style={{ borderRadius: 15 }} elevation={ 0 }>
                <Card.Title title={"Order Details:"} subtitle={`Item Count: ${item.itemCount}`} />
                <Card.Content style={{ height: "100%", flexDirection: "column", gap: "5px" }}>
                    <Text>Tracking Number: {item.trackingNumber}</Text>
                    <Text>Total Price: {item.totalShippingPrice}</Text>
                    <Text>Order for: {item.customerName}</Text>
                    <Text>Shipping Address: {item.shippingAddress}</Text>
                </Card.Content>
            </Card>
        </View>
    );
}

export default SelectedOrderPage;