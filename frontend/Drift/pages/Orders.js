import React from "react";
import axios from 'axios';
import configs from "../config";
import OrderCard from "../components/OrderCard";
import { View, FlatList, Dimensions } from "react-native";
import {useFocusEffect} from "@react-navigation/native"

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth - 20;

const Orders = ({ navigation }) => {
  const [orders, setOrders] = React.useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(configs[0].API_URL + '/order/'); 
      console.log(response.data);
      setOrders(response.data); 
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchOrdersByUserID = async () => {
    try {
      const response = await axios.get(configs[0].API_URL + '/order/id/'); 
      console.log(response.data);
      setOrders(response.data); 
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  // const renderOrder = ({ item }) => (
  //   <OrderCard item={item} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
  // );

    useFocusEffect(
      React.useCallback(() => {
          fetchAllOrders();
      }, [])
  );

  console.log("Here with orders => ", orders);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => 
          <OrderCard item={item} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
        }
        numColumns={1}
        keyExtractor={(order) => order.orderID}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Orders;