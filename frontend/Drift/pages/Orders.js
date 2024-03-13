import React from "react";
import axios from 'axios';
import configs from "../config";
import OrderCard from "../components/OrderCard";
import { View, FlatList, Dimensions } from "react-native";
import {useFocusEffect} from "@react-navigation/native"

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth - 20;

const Orders = ({ navigation }) => {
	  const API_URL = 'http://10.0.2.2:3000';

    const [orders, setOrders] = React.useState([]);

    const fetchAllOrders = async () => {
      try {
        const response = await axios.get(API_URL + '/order/'); 
        console.log(response.data);
        setOrders(response.data); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      console.log("Here with orders => ", orders);
    };

    const renderOrder = ({ item }) => (
      <OrderCard order={item} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
    );

    useFocusEffect(
      React.useCallback(() => {
          fetchAllOrders();
      }, [])
  );

  return (
    <View style={{ flex: 1 }}>
        <FlatList
          data={orders}
          renderItem={renderOrder}
          numColumns={1}
          keyExtractor={(order) => order.orderID.toString()}
          contentContainerStyle={{ padding: 8, paddingBottom: 10 }}
        />
    </View>
  );
};

export default Orders;