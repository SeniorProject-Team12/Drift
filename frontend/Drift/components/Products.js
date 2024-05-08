import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import ProductCard from "./ProductCard";

const screenWidth = Dimensions.get("window").width;

const Products = ({ items, numCols, navigation, showInfo }) => {
  const [products, setProducts] = useState(items);
  const cardWidth = screenWidth / numCols - 20;
  useEffect(() => {
    setProducts(items);
  }, [items]);

  const renderProduct = ({ item }) => (
    <ProductCard
      item={item}
      cardWidth={cardWidth}
      showInfo={showInfo}
      navigation={navigation}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        numColumns={numCols}
        keyExtractor={(item) => item.itemID}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Products;
