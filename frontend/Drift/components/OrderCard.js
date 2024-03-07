import * as React from "react";
import { Image, Text } from "react-native";
import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderCard = ({ order, cardWidth, showInfo, navigation }) => {
    return(
      <TouchableOpacity
        style={{ width: cardWidth }}
        onPress={() => {
          navigation.navigate();
        }}
      >
        <Card elevation={0} style={{ marginTop: 15, backgroundColor: 'white' }}>
          <Card.Content>
            <Text>Order Card</Text>

            {/* <Image
            source={{
              uri: item.photoURL
            }}
            style={{ width: "100%", height: 100 }}
            resizeMode="cover"
            /> */}
            {showInfo && <Text>{`Number of items: ${order.itemCount}`}</Text>}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
};

export default OrderCard;