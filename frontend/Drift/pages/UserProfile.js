import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  Button,
  Text,
  Card,
} from "react-native-paper";
import Products from "./Products";
import ProfileImage from "../components/profileImage.js";
import axios from "axios";
import configs from "../config";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "../assets/Colors";
import useUserStore from "../components/UserContext.js";

const UserProfile = ({ route, navigation }) => {
  const userID = route.params.userID;
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const userIDLoggedIn = useUserStore((state) => state.userID);

  const isFocused = useIsFocused();

  const fetchUserByUserID = async () => {
    try {
      const response = await axios.get(
        configs[0].API_URL + `/user/getUser/userID/${userID}`
      );
      setUsername(response.data[0].username);
      setName(response.data[0].firstName + " " + response.data[0].lastName);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchProfileByUserID = async () => {
    try {
      const response = await axios.get(
        configs[0].API_URL + `/profile/getProfile/userID/${userID}`
      );
      setImage(response.data.photo);
      setBio(response.data[0].bio);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchItemsByUserID = async () => {
    try {
      const response = await axios.get(
        configs[0].API_URL + `/items/getItemsByUserID/userID/${userID}`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchUserByUserID();
    fetchProfileByUserID();
    fetchItemsByUserID();
  }, [isFocused]);

  useEffect(() => {}, [items]);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View>
          <ProfileImage image={image} />
        </View>

        <Card.Title
          title={name}
          titleVariant="headlineMedium"
          subtitle={username}
          subtitleVariant="labelLarge"
          style={styles.profileHeaderCol2}
        />
      </View>

      <Card.Content>
        <Text>{bio}</Text>
      </Card.Content>

      <Card.Actions style={{ justifyContent: "space-between" }}>
        <Button
          textColor={colors.lightBlue}
          buttonColor={colors.white}
          mode="outlined"
          style={{ flex: 1, marginRight: 4, borderColor: colors.lightBlue }} // Use marginRight to add spacing between buttons
        >
          Follow
        </Button>
        <Button
          textColor="white"
          buttonColor={colors.lightBlue}
          mode="contained"
          style={{ flex: 1, marginLeft: 4 }} // Use marginLeft to add spacing between buttons
          onPress={() =>
            navigation.navigate("Conversation", { receiverID: String(userID) })
          }
        >
          Message
        </Button>
        <Button
          textColor="white"
          buttonColor={colors.red}
          mode="contained"
          style={{ flex: 1, marginLeft: 4 }} // Use marginLeft to add spacing between buttons
          onPress={() =>
            Alert.alert("Confirm Report User", "Are you sure you want to report this user?",
              [
                {
                  text: "YES",
                  onPress: async () => {
                    try {
                      console.log(configs[0].API_URL + "/user/reportUser/id/" + userIDLoggedIn);
                      const response = await axios.post(
                        configs[0].API_URL + "/user/reportUser/id/" + userIDLoggedIn 
                      );
                      alert(
                        "This user's profile has been reported and will be reviewed by Admin!"
                      );
                    } catch (e) {
                      console.error("Error reporting posted item:", e);
                    }
                  },
                },
                {
                  text: "NO",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
              ]
            ) 
          }
        >
          Report
        </Button>
      </Card.Actions>

      <Products items={items} navigation={navigation} showInfo={false} />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    padding: 10,
  },
  profileHeaderCol2: {
    flex: 1,
    justifyContent: "center",
  },
  products: {
    flex: 1,
  },
});
