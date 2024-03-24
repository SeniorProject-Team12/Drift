import axios from 'axios';
import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native"
import configs from "../../config";
import ItemCard from "./ItemCard";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 20;

const Posts = ({ query, navigation }) => {
    const [posts, setPosts] = React.useState([]);

    const fetchAllPostedItems = async () => {
      try {
        {console.log('fetchAllPostedItems', query)}
        const response = await axios.get(configs[0].API_URL + '/items/getAllItems'); 
        setPosts(response.data); 
      } catch (error) {
        console.error('Error fetching posted items:', error);
      }
    };
  
    const fetchItemByKeyword= async (query) => {
      {console.log('fetchByKeywords', query)}
  
        query = query.toLowerCase();
  
        const filteredPosts = posts.filter((item) => {
            const name = item.name.toLowerCase();
            const brand = item.brand.toLowerCase();
            const category = item.category.toLowerCase();
        
            return (
                name.includes(query) ||
                brand.includes(query) ||
                category.includes(query)
            );
        });
        {console.log('filteredItems', filteredPosts)}
        setPosts(filteredPosts)
    };
    
    const renderPost = ({ item }) => (
      <ItemCard item={item} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
    );
  
    useFocusEffect(
      React.useCallback(() => {
      if (query === "") {
        fetchAllPostedItems();
      } else {
        fetchItemByKeyword(query);
      }
    }, [query]));
  
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={posts}
          renderItem={renderPost}
          numColumns={2}
          keyExtractor={(post) => post.itemID}
          contentContainerStyle={{ padding: 8 }}
        />
      </View>
    );
  
};

export default Posts;