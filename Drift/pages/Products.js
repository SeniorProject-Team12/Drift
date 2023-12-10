import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import ProductCard from "../components/ProductCard";
import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://exp://fbkhzom.fchau1.8081.exp.direct', // Use your Expo development server's address
// });

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

const Products = ({ query, navigation }) => {
  const [items, setItems] = React.useState([]);

  const fetchAllItems = async () => {
    try {
      {console.log('fetchAllItems', query)}
      const response = await axios.get('/items/getAllItems'); 
      setItems(response.data); 
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchItemByKeyword= async (query) => {
    {console.log('fetchItemByKeyword: in Products', query)}
    const url = `/items/getItemsByKeyWord?keyword=${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(url); // Replace with your server's URL
      setItems(response.data); // Assuming response.data contains the items
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  
  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
  );

  React.useEffect(() => {
    if (query === "") {
      fetchAllItems();
    } else {
      fetchItemByKeyword(query);
    }
  }, [query])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        renderItem={renderProduct}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Products;