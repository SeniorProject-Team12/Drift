import React from "react";
import configs from "../config";
import { View, FlatList, Dimensions } from "react-native";
import ProductCard from "../components/ProductCard";
import testItems from "./testData/testItems";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

const Products = ({ query, navigation }) => {
  const [items, setItems] = React.useState([]);
  let itemsToQuery = [];

  const fetchAllItems = async () => {
    try {
      // {console.log('fetchAllItems', query)}
      const response = await axios.get(configs[0].API_URL + '/items/getAllItems'); 
      itemsToQuery = response.data;
      setItems(response.data); 
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    // setItems(testItems)
  };

  const fetchItemByKeyword= async (query) => {
    {console.log('fetchByKeywords', query)}

    query = query.toLowerCase();

    const response = await axios.get(configs[0].API_URL + '/items/getAllItems'); 

    const filteredItems = (response.data).filter((item) => {
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