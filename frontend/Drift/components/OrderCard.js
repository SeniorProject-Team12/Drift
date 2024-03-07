import * as React from "react";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderCard = ({ item, cardWidth, showInfo, navigation }) => {
  console.log("Order card rendered w/", item);

  return(
    <TouchableOpacity
      style={{ width: cardWidth }}
      onPress={() => {
        navigation.navigate("Order Details", {item: item});
      }}
    >
      <Card elevation={0} style={{ marginTop: 15, backgroundColor: 'white' }}>
        <Card.Content>
          <Text style={{ fontSize: 16, paddingBottom: 15, fontWeight: '600'}}>Order Card</Text>
          {showInfo && <Text>{`Tracking Number: ${item.trackingNumber}`}</Text>}
          <Text>{`Customer Name: ${item.customerName}`}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;