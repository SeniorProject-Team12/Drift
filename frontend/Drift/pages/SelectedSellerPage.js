import { React, useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import configs from '../config.js';

const SelectedSellerPage = ({ route }) => {
    console.log("Selected Seller PAGE");


    const { item } = route.params;
    const [buttonText, setButtonText] = useState("");
    const navigation = useNavigation();


    useEffect(() => {
        if (route.params && route.params.item) {
            const { item } = route.params;
            setButtonText(item.orderStatus === 2 ? "Mark As Unsent" : "Mark As Sent");
            console.log(item);
        }
        
        navigation.getParent()?.setOptions({
            headerShown: false,
        });
        
        return () => {
            navigation.getParent()?.setOptions({
                headerShown: true,
            });
        };
    }, [navigation, route.params]);


    const updateOrderStatus = async () => {
        try {
            let newStatus = 1;

            if (buttonText == 'Mark As Sent') {
                newStatus = 2;
            }

            const { orderID } = route.params.item;
    
            await axios.post(configs[0].API_URL + '/order/updateOrderStatus/id/' + orderID, {
                orderStatus: newStatus
            });

            // Update button text based on new order status
            setButtonText(newStatus === 2 ? "Unmark As Sent" : "Mark As Sent");
        } catch(error) {
            console.error('Error updating order status:', error);
        }
    }

    return(
        <View>
            <Card style={{ borderRadius: 15 }} elevation={ 0 }>
                <Card.Title titleStyle={{fontSize: 24, fontWeight: '700'}} title={"Sold Item Details:"} subtitleStyle={styles.text}/>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.photoURL }} style={styles.image}/>
                </View>
                <Card.Content style={{ height: "100%", flexDirection: "column", gap: "5px" }}>
                    <Text style={styles.title}>{item.brand} - {item.category}</Text>
                    <Text style={styles.text}>Order ID: {item.orderID}</Text>
                    <Text style={styles.text}>Total Price: {item.totalPrice}</Text>
                    <Text style={styles.text}>Order for: {item.customerName}</Text>
                    <Text style={styles.text}>Shipping Address: {item.shippingAddress}</Text>
                    <Button onPress={updateOrderStatus}>{buttonText}</Button>
                </Card.Content>
            </Card>
        </View>
    );
}

export default SelectedSellerPage;

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