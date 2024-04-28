import React from "react";
import axios from 'axios';
import configs from "../config";
import OrderCard from "../components/OrderCard";
import { View, FlatList, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useUserStore from "../components/UserContext";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth - 20;

const Orders = ({ navigation }) => {
  const [orders, setOrders] = React.useState([]);

  const userID = useUserStore((state) => state.userID)

  const fetchOrdersByUserID = async () => {
    console.log(configs[0].API_URL + '/order/getOrderByID/id/' + userID.toString());
    try {
      const response = await axios.get(configs[0].API_URL + '/order/getOrderByID/id/' + userID.toString()); 
      fetchItemInfoByItemID(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchItemInfoByItemID = async (ordersData) => {
    try {
      const promises = ordersData.map(async (order) => {
        try {
          const itemResponse = await axios.get(configs[0].API_URL + '/items/getItemsByUserID/itemID/' + order.items.toString());
  
          const photoURL = itemResponse.data.length > 0 ? itemResponse.data[0].photoURL : null;
          const brand = itemResponse.data.length > 0 ? itemResponse.data[0].brand : null;
          const category = itemResponse.data.length > 0 ? itemResponse.data[0].category : null;
          const sellerUsername = await fetchUsernameByUserID(itemResponse.data[0].userID);
  
          order.photoURL = photoURL;
          order.brand = brand;
          order.category = category;
          order.sellerUsername = sellerUsername;
        } catch (error) {
          console.error('Error fetching items for order:', error);
        }
      });
  
      await Promise.all(promises);
  
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching item info:', error);
    }
  };

  const fetchUsernameByUserID = async (userID) => {
    try {
      const response = await axios.get(configs[0].API_URL + '/user/getUserByUserID/id/' + userID);

      return response.data[0].username;
      
    } catch (error) {
      console.error('Error fetching username for order:', error);
    }
  };
  
  // const renderOrder = ({ item }) => (
  //   <OrderCard item={item} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
  // );

    useFocusEffect(
      React.useCallback(() => {
          fetchOrdersByUserID();
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