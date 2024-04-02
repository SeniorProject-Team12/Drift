import * as React from 'react';
import { View, Text, Image, Pressable } from "react-native";
import { Button, Card } from "react-native-paper";
import { useCart } from "../components/CartContext"
import { useEffect } from "react";

const userID = 1;

const ItemPage = ({route}) => {
  console.log("ITEMPAGE")
  const [folders, setFolders] = React.useState([]);
  const [isSaved, setIsSaved] = React.useState();

    const {item} = route.params;
    const { dispatch } = useCart();

    const handleAddToCart = () => {
      dispatch({ type: 'ADD_TO_CART', item });
      console.log('Item added to cart:', item);
    };

    const fetchIsSaved =  async () => {
      console.log("checking if saved")
      try {
          console.log(items.itemID)
          console.log(userID)
          const response = await axios.post(configs[0].API_URL +`/savedItems/isSaved/userID/${userID}/itemID/${item.itemID}`);
          setIsSaved(response.data)
          console.log("isSaved", isSaved)
      } catch (error) {
          console.error('Error:', error);
      }
    };

    const saveItem =  async () => {
      console.log("saving item")
      try {
          console.log(folderName)
          console.log(userID)
          const response = await axios.post(configs[0].API_URL +`savedItems/addSavedItem`, { savedFolderID: savedFolderID, itemID: itemID});
     
      } catch (error) {
          console.error('Error:', error);
      }
    };

    const fetchSavedFolders = async () => {
      try {
          const response = await fetch(configs[0].API_URL +`/savedFolders/getSavedFolders/userID/${userID}`);
          if (!response.ok) throw new Error('Network response was not ok.');
          const data = await response.json();
          setFolders(data);
      } catch (error) {
          console.error('There was an error fetching the saved folders:', error);
      }
  };
  
  useEffect(() => {
    fetchIsSaved();
}, []);

    console.log(item)
    return (
      <View>
        <Text>Item Page</Text>
      <Card style={{ borderRadius: 15 }} elevation={0}>
        <Image
            source={{
              uri: item.photoURL
            }}
            style={{ width: "100%", height: 300 }}
            resizeMode="cover"
          />

        <Card.Title title={item.brand + ' - '+ item.category} subtitle={item.sellerId} />

        <Card.Content
          style={{ height: "25%", flexDirection: "column", gap: "5px" }}
        >

        <Text>{item.price} USD</Text>
        <Text>{item.description}</Text>

        </Card.Content>

        <Card.Actions style={{flexDirection: 'row'}}>
          <Button
            style={{ backgroundColor: 'white' }}
            textColor = 'black'
          >
            More from owner
          </Button>

          <Button
            style={{ backgroundColor: 'white' }}
            textColor="black"
          >
            Save
          </Button>
         
            <Button
              textColor="white"
              onPress={handleAddToCart}
            >
              Add to cart
            </Button>
    
        </Card.Actions>
      </Card>

    </View>
  );
};

export default ItemPage;
