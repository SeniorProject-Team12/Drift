import React, { useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import ProductCard from "../components/ProductCard";

import testItems from "./testData/testItems";
import axios from 'axios';
import {useFocusEffect} from "@react-navigation/native"
import configs from "../config";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

const Products = ({ items, navigation, showInfo}) => {
  const [products, setProducts] = useState(items)
  console.log("products",products)

  const fetchAllItems = async () => {
    try {
      {console.log('fetchAllItems', query)}
      const response = await axios.get(configs[0].API_URL + '/items/getAllItems'); 
      setItems(response.data); 
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    //setItems(testItems)
  };

  const fetchItemByKeyword= async (query) => {
    {console.log('fetchByKeywords', query)}

  query = query.toLowerCase();

  const filteredItems = items.filter((item) => {
    const name = item.name.toLowerCase();
    const brand = item.brand.toLowerCase();
    const category = item.category.toLowerCase();

    return (
      name.includes(query) ||
      brand.includes(query) ||
      category.includes(query)
    );
  });
  {console.log('filteredItems', filteredItems)}
  setItems(filteredItems)
    // {console.log('fetchItemByKeyword: in Products', query)}
    // const url = `/items/getItemsByKeyWord?keyword=${encodeURIComponent(query)}`;

    // try {
    //   const response = await axios.get(url); 
    //   setItems(response.data);
    // } catch (error) {
    //   console.error('Error fetching items:', error);
    // }
  };
  
  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={showInfo} navigation={navigation} />
  );

  useFocusEffect(
    React.useCallback(() => {
    if (query === "") {
      fetchAllItems();
    } else {
      fetchItemByKeyword(query);
    }
  }, [query]));

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        numColumns={2}
        keyExtractor={(item) => item.itemID}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Products;