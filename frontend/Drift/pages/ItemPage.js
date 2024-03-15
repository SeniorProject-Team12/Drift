import React from 'react';
import { View, Text, Image, Pressable } from "react-native";
import { Button, Card } from "react-native-paper";
import { useCart } from "../components/CartContext"

const ItemPage = ({route}) => {
  console.log("ITEMPAGE")

    const {item} = route.params;
    const { dispatch } = useCart();

    const handleAddToCart = () => {
      dispatch({ type: 'ADD_TO_CART', item });
      console.log('Item added to cart:', item);
    };
  

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
            textColor = 'white'
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
