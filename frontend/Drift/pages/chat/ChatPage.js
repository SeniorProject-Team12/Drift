import React, { useState, useEffect } from "react";
import { CometChat } from "@cometchat-pro/react-native-chat";
import useUserStore from "../../components/UserContext";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { colors } from "../../assets/Colors";
import { Avatar, Card, IconButton } from "react-native-paper";

const COMETCHAT_AUTHKEY = "dca323479e4634f3626d04753a10521f35a5c1cc";

const ChatPage = ({ navigation }) => {
  const chatUserID_one = useUserStore((state) => state.userID);
  const chatUserID = String(chatUserID_one);

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    CometChat.getLoggedinUser().then(
      (user) => {
        if (!user) {
          CometChat.login(chatUserID, COMETCHAT_AUTHKEY).then(
            (user) => {
              console.log("Login Successful:", { user });
            },
            (error) => {
              console.log("Login failed with exception:", { error });
            }
          );
        }
      },
      (error) => {
        console.log("Some Error Occured", { error });
      }
    );
    fetchConversations();
  }, []);

  const fetchConversations = () => {
    var conversationRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(50)
      .build();

    conversationRequest.fetchNext().then(
      (conversationList) => {
        setConversations(conversationList);
      },
      (error) => {
        console.log("Conversation fetching failed with error:", error);
      }
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Conversation", {
            receiverID: String(item.conversationWith.uid),
          });
        }}
        style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
      >
        <Card.Title
          title={item.conversationWith.name}
          subtitle={item.lastMessage.data.text}
          left={() => <Avatar.Icon icon="account" />}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.conversationId}
      renderItem={renderItem}
    />
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});