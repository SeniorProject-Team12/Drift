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
 
  const renderProduct = ({ item }) => (
    <ProductCard item={item} cardWidth={cardWidth} showInfo={showInfo} navigation={navigation} />
  );

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