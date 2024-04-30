import React from "react";
import axios from 'axios';
import configs from "../config";
import SoldItemCard from "../components/SoldItemCard";
import { View, FlatList, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useUserStore from "../components/UserContext";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth - 20;

const Selling = ({ navigation }) => {
  const [orders, setOrders] = React.useState([]);

  const sellerID = useUserStore((state) => state.userID);

const fetchOrdersBySellerID = async () => {
  console.log(configs[0].API_URL + '/order/getOrderBySellerID/id/' + sellerID.toString());
  try {
    const response = await axios.get(configs[0].API_URL + '/order/getOrderBySellerID/id/' + sellerID.toString()); 
    const ordersData = response.data
    fetchItemInfoByItemID(ordersData);

  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

const fetchItemInfoByItemID = async (ordersData) => {
  for (const order of ordersData) {
    try {
      // Fetch items associated with the order
      const itemResponse = await axios.get(configs[0].API_URL + '/items/getItemsByUserID/itemID/' + order.items.toString());
      
      const photoURL = itemResponse.data.length > 0 ? itemResponse.data[0].photoURL : null;
      const brand = itemResponse.data.length > 0 ? itemResponse.data[0].brand : null;
      const category = itemResponse.data.length > 0 ? itemResponse.data[0].category : null;

      order.photoURL = photoURL;
      order.brand = brand;
      order.category = category;
    } catch (error) {
      console.error('Error fetching items for order:', error);
    }
  }
      setOrders(ordersData);
  }

    useFocusEffect(
      React.useCallback(() => {
          fetchOrdersBySellerID();
      }, [])
  );

  console.log("Here with orders => ", orders);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => 
          <SoldItemCard item={item} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
        }
        numColumns={1}
        keyExtractor={(order) => order.orderID}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Selling;