import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import ProductCard from "../components/ProductCard";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

const Products = ({ items, navigation, showInfo}) => {

    // {console.log('fetchItemByKeyword: in Products', query)}
    // const url = `/items/getItemsByKeyWord?keyword=${encodeURIComponent(query)}`;

    // try {
    //   const response = await axios.get(url); 
    //   setItems(response.data);
    // } catch (error) {
    //   console.error('Error fetching items:', error);
    // }
  
  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={showInfo} navigation={navigation} />
  );

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