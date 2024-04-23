import * as React from "react";
import { Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";
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

            <View style={styles.container}>
                <View style={styles.card}>
                <Image 
                    style={styles.cardImage}
                    source={{ uri: item.photoURL }}
                />
                {showInfo && <View style={styles.textContainer}>
                    {showReported && <Text style={{ color: 'red', justifyContent: 'center', flexDirection: 'row' }}>REPORTED ITEM</Text> || showInfo && <Text style={styles.cardTitleText}>{`${item.brand} - ${item.category} $${item.price}`}</Text>}
                </View>}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ItemCard;

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