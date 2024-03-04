import React from "react";
import axios from 'axios';
import OrderCard from "../components/OrderCard";
import { View, FlatList, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth - 20;

const Orders = ({ query="", navigation }) => {
  const API_URL = 'http://192.168.1.54:3000'

  const [orders, setOrders] = React.useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(API_URL + '/order/'); 
      console.log(response.data);
      setOrders(response.data); 
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  const renderOrder = ({ order }) => (
    <OrderCard order={order} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
  );

  React.useEffect(() => {
    if (query === "") {
      fetchAllOrders();
    } else {
      // fetchItemByKeyword(query);
    }
  }, [query])

  console.log("Here with orders => ", orders);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        numColumns={1}
        keyExtractor={(order) => order.id}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Orders;