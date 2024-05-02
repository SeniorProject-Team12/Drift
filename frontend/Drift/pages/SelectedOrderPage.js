import React from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

const SelectedOrderPage = ({ route }) => {
    console.log("Selected Order PAGE");

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

    return(
        <View>
            <Card style={{ borderRadius: 15 }} elevation={ 0 }>
                <Card.Title titleStyle={{fontSize: 24, fontWeight: '700'}} title={"Order Details:"} subtitleStyle={styles.text}/>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.photoURL }} style={styles.image}/>
                </View>
                <Card.Content style={{ height: "100%", flexDirection: "column", gap: "5px" }}>
                    <Text style={styles.title}>{item.brand} - {item.category}</Text>
                    <Text style={styles.text}>Order ID: {item.orderID}</Text>
                    <Text style={styles.text}>Subtotal: ${(item.totalPrice - item.salesTax).toFixed(2)}</Text>
                    <Text style={styles.text}>Sales Tax: ${item.salesTax}</Text>
                    <Text style={styles.text}>Total Price: ${item.totalPrice}</Text>
                    <Text style={styles.text}>Tracking Number: {item.trackingNumber}</Text>
                    <Text style={styles.text}>Purchased from: {item.sellerUsername}</Text>
                    <Text style={styles.text}>Shipping Address: {item.shippingAddress}</Text>
                </Card.Content>
            </Card>
        </View>
    );
}

export default SelectedOrderPage;

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        marginTop: -10,
        marginBottom: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '600',
        paddingBottom: 5,
      },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    text: {
        marginLeft: 10,
        marginBottom: 5
    },
});