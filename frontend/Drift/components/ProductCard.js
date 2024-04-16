import * as React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProductCard = ({ item, cardWidth, showInfo, navigation }) => {
  return (
    <TouchableOpacity
      style={{ width: cardWidth }}
      onPress={() => {
        navigation.navigate("Item Details", {item: item });
      }}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image 
            style={styles.cardImage}
            source={{ uri: item.photoURL }}
          />
          {showInfo && <View style={styles.textContainer}>
            {showInfo && <Text style={styles.cardTitleText}>{`${item.brand} - ${item.category} $${item.price}`}</Text>}
          </View>}
        </View>
      </View>
    </TouchableOpacity>
    
    // old card code

    // <View style={{ borderWidth: 2, borderColor: 'white' }}>
    //   <TouchableOpacity
    //     style={{ width: cardWidth }}
    //     onPress={() => {
    //       navigation.navigate("Item Details", {item: item });
    //     }}
    //   >
    //     <Card elevation={0}>
    //       <Card.Content>
    //         <Image
    //           source={{
    //             uri: item.photoURL
    //           }}
    //           style={{ width: "100%", height: 100 }}
    //           resizeMode="cover"
    //         />
    //         {showInfo && <Text>{`${item.brand} - ${item.category} $${item.price}`}</Text>}
    //       </Card.Content>
    //     </Card>
    //   </TouchableOpacity>
    // </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    paddingLeft: 15,
  },
  card:{
    width: 165,
    height: 160,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
  },
  cardImage: {
    width: 165,
    height: 160,
    borderRadius: 10
  },
  textContainer:{
    position: "absolute",
    width: 165,
    height: 30,
    bottom:0,
    padding: 5,
    backgroundColor: "rgba(0,0,0, 0.8)",
    borderBottomLeftRadius : 10,
    borderBottomRightRadius: 10
  },
  cardTitleText: {
     color: "white",
  }
});