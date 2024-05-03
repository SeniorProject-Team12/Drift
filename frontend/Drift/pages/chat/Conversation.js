import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { CometChat } from "@cometchat-pro/react-native-chat";
import useUserStore from "../../components/UserContext";
import { colors } from "../../assets/Colors";

const COMETCHAT_APPID = "25579388a65f32e7";
const COMETCHAT_AUTHKEY = "dca323479e4634f3626d04753a10521f35a5c1cc";

const Conversation = ({ route }) => {
  const { receiverID } = route.params;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  const chatUserID = useUserStore((state) => state.userID);

  useEffect(() => {
    CometChat.getLoggedinUser().then(
      (user) => {
        if (!user) {
          CometChat.login(chatUserID, COMETCHAT_AUTHKEY).then(
            (user) => {
              console.log("Login Successful:", { user });
              fetchMessages();
            },
            (error) => {
              console.log("Login failed with exception:", { error });
            }
          );
        } else {
          fetchMessages();
        }
      },
      (error) => {
        console.log("Some Error Occurred", { error });
      }
    );

    const listenerID = "unique-listener-id";
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          setMessages((prevMessages) => [message, ...prevMessages]);
        },
      })
    );

    return () => {
      CometChat.removeMessageListener(listenerID);
    };
  }, []); 

  const fetchMessages = () => {
    const limit = 30;
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(receiverID) 
      .setLimit(limit)
      .build();

    messagesRequest.fetchPrevious().then(
      (messages) => setMessages(messages),
      (error) => console.log("Message fetching failed with error:", error)
    );
  };

  const sendMessage = () => {
    if (input.trim() === "" || sending) return;

    setSending(true);

    const textMessage = new CometChat.TextMessage(
      receiverID,
      input,
      CometChat.RECEIVER_TYPE.USER
    );

    CometChat.sendMessage(textMessage).then(
      (message) => {
        setMessages((prevMessages) => [message, ...prevMessages]);
        setInput("");
      },
      (error) => console.log("Message sending failed with error:", error)
      ).finally(() => {
        setSending(false);
      });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text
            //variant="labelMedium"
              style={
                item.sender.uid === chatUserID ? styles.sender : styles.receiver
              }
            >
              {item.text}
            </Text>
          )}
          inverted
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              flex: 1,
              // borderWidth: 1,
              // borderColor: "#ccc",
              // padding: 10,
              margin: 5,
            }}
            mode="outlined"
            outlinedColor="#ccc"
            value={input}
            onChangeText={setInput}
            disabled={sending}
          />
          <Button mode="text" textColor={colors.darkBlue} onPress={sendMessage} disabled={sending}>Send</Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Conversation;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});

const styles = StyleSheet.create({
  sender: {
    margin: 5,
    padding: 10,
    backgroundColor: colors.lightBlue, // Light green
    alignSelf: "flex-end",
    borderRadius: 20,
    maxWidth: "80%",
  },
  receiver: {
    margin: 5,
    padding: 10,
    backgroundColor: "#f0f0f0", // Light grey
    alignSelf: "flex-start",
    borderRadius: 20,
    maxWidth: "80%",
  },
});
