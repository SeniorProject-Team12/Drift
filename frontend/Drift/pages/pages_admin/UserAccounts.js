import React from "react";
import axios from 'axios';
import configs from "../../config";
import UserCard from "./UserCard";
import { View, FlatList, Dimensions } from "react-native";
import {useFocusEffect} from "@react-navigation/native"

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth - 20;

const UserAccounts = ({ navigation }) => {
    const [accounts, setAccounts] = React.useState([]);

    const fetchAllUserAccounts = async () => {
        try {
            const response = await axios.get(configs[0].API_URL + "/user/");
            console.log(response.data);
            setAccounts(response.data);
        } catch(e) {
            console.error("Error fetching accounts: " + e);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchAllUserAccounts();
        }, [])
    );
  
    console.log("Here with users => ", accounts);
  
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={accounts}
          renderItem={({ item }) => 
            <UserCard item={item} cardWidth={cardWidth} showInfo={true} navigation={navigation} />
          }
          numColumns={1}
          keyExtractor={(account) => account.userID}
          contentContainerStyle={{ padding: 8 }}
        />
      </View>
    );
};

export default UserAccounts;