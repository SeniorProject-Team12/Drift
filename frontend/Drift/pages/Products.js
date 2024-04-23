import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import ProductCard from "../components/ProductCard";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

const Products = ({ items, navigation, showInfo }) => {
  const [products, setProducts] = useState(items);
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
        numColumns={2}
        keyExtractor={(item) => item.itemID}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Products;
