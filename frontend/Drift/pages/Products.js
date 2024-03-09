import React, { useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import ProductCard from "../components/ProductCard";

import testItems from "./testData/testItems";

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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 0 }}
      />
    </View>
  );
};

export default Products;