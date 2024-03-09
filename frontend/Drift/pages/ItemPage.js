import React from 'react';
import { View, Text, Image } from "react-native";
import { Button, Card } from "react-native-paper";

const ItemPage = ({route}) => {
  console.log("ITEMPAGE")

    const {item} = route.params;
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

        <Card.Title title={item.name} subtitle={item.sellerId} />

        <Card.Content
          style={{ height: "50%", flexDirection: "column", gap: "5px" }}
        >

        <Text>{item.price}</Text>
        <Text>{item.category}</Text>
        <Text>{item.brand}</Text>
        <Text>{item.quality}</Text>

        </Card.Content>

        <Card.Actions style={{flexDirection: 'row'}}>
          <Button
            textColor="white"
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
            >
              Add to cart
            </Button>
    
        </Card.Actions>
      </Card>

    </View>
  );
};

export default ItemPage;
