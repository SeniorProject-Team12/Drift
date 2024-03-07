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
            {/* <Text style={{ fontSize: 20, alignContent: 'center', justifyContent: 'center' }}>Order Page</Text> */}
            <Card style={{ borderRadius: 15 }} elevation={ 0 }>
                <Card.Title titleStyle={{fontSize: 24, fontWeight: '700'}} title={"Order Details:"} subtitleStyle={styles.text} subtitle={`Item Count: ${item.itemCount}`} />
                <Card.Content style={{ height: "100%", flexDirection: "column", gap: "5px" }}>
                    <Text style={styles.text}>Order ID: {item.orderID}</Text>
                    <Text style={styles.text}>Tracking Number: {item.trackingNumber}</Text>
                    <Text style={styles.text}>Total Price: {item.totalShippingPrice}</Text>
                    <Text style={styles.text}>Order for: {item.customerName}</Text>
                    <Text style={styles.text}>Shipping Address: {item.shippingAddress}</Text>
                </Card.Content>
            </Card>
        </View>
    );
}

export default SelectedOrderPage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
    text: {
        marginLeft: 10,
        marginBottom: 5
    },
});