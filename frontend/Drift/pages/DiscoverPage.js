import React, { useEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
import { Searchbar, IconButton, Text, ActivityIndicator } from "react-native-paper";
import Products from "../components/Products";
import { Appbar } from "react-native-paper";
import axios from "axios";
import configs from "../config";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "../assets/Colors";

const DiscoverPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused();
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeSearch = (keyword) => {setSearchQuery(keyword);
    if (searchQuery === "") {
      fetchAllUnsoldItems();
    } else {
      fetchSearchResults();
    }
  }

  const fetchAllItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        configs[0].API_URL + "/items/getAllItems",
        { timeout: 30000 }
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

    const fetchAllUnsoldItems = async () => {
      setLoading(true);
      try {
          console.log(configs[0].API_URL + '/items/getAllUnsoldItems') 
          const response = await axios.get(configs[0].API_URL + '/items/getAllUnsoldItems', { timeout: 30000 });
          setItems(response.data); 
      } catch (error) {
          console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await fetch(configs[0].API_URL + `/items/getItemsByKeyWord?keyword=${searchQuery}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            if (data.length === 0) {
              setNoResults(true);
            } else {
              setNoResults(false);
              setItems(data);
            }
        } catch (error) {
            console.error('There was an error fetching the items by keyword:', error);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery === "") {
            fetchAllUnsoldItems();
        }
    }, [isFocused]); 

    useEffect(() => {
    }, [items]); 
    
  return (
    <View style={[styles.container]}>
      <Appbar.Header style={{ backgroundColor: "transparent" }}>
        <Searchbar
          style={{ flex: 1 }}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <IconButton
          icon="basket"
          size={20}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      </Appbar.Header>

      {loading ? (
        <ActivityIndicator animating={true} color={colors.white} />
      ) : noResults ? (
        <Text variant="titleMedium" style={{marginRight: 20}}>No results found</Text>
      ) : (
        <Products items={items} numCols={2} navigation={navigation} showInfo={true} />
      )}
    </View>
  );
};

export default DiscoverPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -40,
    backgroundColor: "#8fcbbc",
  },
  header: {
    left: 0,
    right: 0,
    padding: 8,
  },
});
