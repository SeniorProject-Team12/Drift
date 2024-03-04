import React from 'react';
import { View, Text, Image } from "react-native";
import { Button, Card } from "react-native-paper";

const SelectedOrderPage = ({ route }) => {
    console.log("Selected Order PAGE");

    const { order } = route.params;
    console.log(order);

    return(
        <View>
            <Text>Order Page</Text>
            <Card style={{ borderRadius: 15 }} elevation={ 0 }>
                <Card.Title title={"Order Details:"} subtitle={`Item Count: ${order}`} />
                <Card.Content style={{ height: "100%", flexDirection: "column", gap: "5px" }}>
                    <Text>Tracking Number: {order}</Text>
                    <Text>Total Price: {order}</Text>
                    <Text>Order for: {order}</Text>
                    <Text>Shipping Address: {order}</Text>
                </Card.Content>
            </Card>
        </View>
    );
}

export default SelectedOrderPage;