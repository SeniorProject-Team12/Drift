import { React, useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import { Button, Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import configs from '../config.js';

const SelectedSellerPage = ({ route }) => {
    console.log("Selected Seller PAGE");


    const { item } = route.params;
    const [buttonText, setButtonText] = useState("");
    const navigation = useNavigation();
    const [showTrackingEntrySheet, setShowTrackingEntrySheet] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState("");


    useEffect(() => {
        if (route.params && route.params.item) {
            const { item } = route.params;
            setButtonText(item.orderStatus === 2 ? "Marked As Sent" : "Mark As Sent");
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


    const onMarkAsSent = async () => {

        if (buttonText === 'Mark As Sent') {
            setShowTrackingEntrySheet(true);
            console.log( "displaying tracking number entry sheet!")
        }

        //setButtonText("Mark As Sent");

    };

    const updateOrderStatus = async () => {
        if(trackingNumber != '') {
            try {
                const { orderID } = route.params.item;

                await axios.post(configs[0].API_URL + '/order/updateOrderStatus/id/' + orderID, {
                    orderStatus: 2,
                    trackingNumber: trackingNumber
                });

                setButtonText("Marked As Sent");
                setShowTrackingEntrySheet(false);
            } catch(error) {
                console.error('Error updating order status', error);
                setShowTrackingEntrySheet(false);
            }
        }
    };

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
                    <Text style={styles.text}>Subtotal: ${(item.totalPrice - item.salesTax).toFixed(2)}</Text>
                    <Text style={styles.text}>Sales Tax: ${item.salesTax}</Text>
                    <Text style={styles.text}>Total Price: ${item.totalPrice}</Text>
                    <Text style={styles.text}>Tracking Number: {item.trackingNumber}</Text>
                    <Text style={styles.text}>Order for: {item.customerName}</Text>
                    <Text style={styles.text}>Shipping Address: {item.shippingAddress}</Text>
                    <Button onPress={onMarkAsSent}>{buttonText}</Button>
                </Card.Content>
            </Card>
                {showTrackingEntrySheet && (
                    <View style={styles.trackingEntryContainer}>
                        <TextInput
                            style={styles.trackingInput}
                            placeholder="Enter Tracking Number"
                            onChangeText={setTrackingNumber}
                            value={trackingNumber}
                        />
                        <View style={styles.trackingButtonContainer}>
                            <Button onPress={() => setShowTrackingEntrySheet(false)}>Cancel</Button>
                            <Button onPress={updateOrderStatus}>Submit</Button>
                        </View>
                    </View>
                )}
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
    trackingEntryContainer: {
        marginVertical: 300,
        marginHorizontal: 30,
        padding: 20,
        height: 150,
        backgroundColor: 'white',
        ...StyleSheet.absoluteFillObject,
    },
    trackingInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    trackingButtonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});