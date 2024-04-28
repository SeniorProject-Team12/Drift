import * as React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const SoldItemCard = ({ item, cardWidth, showInfo, navigation }) => {
  console.log("Sold item card rendered w/", item);

  const getStatus = (input) => {
    if (input === 1) {
      return "You have yet to send this item.";
    } else if (input === 2) {
      return "You have sent this item.";
    } else if (input === 3) {
      return "This item was successfully received.";
    } else {
      return "Invalid input";
    }
  };

  const statusString = getStatus(item.orderStatus);

  return(
    <TouchableOpacity
      style={{ width: cardWidth }}
      onPress={() => {
        navigation.navigate("Seller Details", { item: item });
      }}
    >
      <Card elevation={0} style={{ marginTop: 15, backgroundColor: 'white' }}>
        <Card.Content style={styles.container}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.photoURL }} style={styles.image} />
          </View>
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.brand} - {item.category}</Text>
            <Text style={styles.customerName}>{`Order for ${item.customerName}`}</Text>
            <Text style={styles.customerName}>{statusString}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    paddingRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 5,
  },
  customerName: {
    fontSize: 14,
  },
});

export default SoldItemCard;