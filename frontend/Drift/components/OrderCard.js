import * as React from "react";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderCard = ({ order, cardWidth, showInfo, navigation }) => {
  console.log("Order card rendered w/", order);

  return(
    <TouchableOpacity
      style={{ width: cardWidth }}
      onPress={() => {
        navigation.navigate("Order Details", {order: order});
      }}
    >
      <Card elevation={0} style={{ marginTop: 15, backgroundColor: 'white' }}>
        <Card.Content>
          <Text>Order Card</Text>
          {showInfo && <Text>{`Order ID: ${order}`}</Text>}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;