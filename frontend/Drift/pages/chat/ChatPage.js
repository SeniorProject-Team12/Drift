import { StyleSheet, Text, View, Pressable, Button, FlatList, TextInput } from 'react-native';
import { Container, Card, UserInfo, UserImgWrapper, UserImg, UserInfoText, UserName, PostTime, MessageText, TextSection } from '../../components/ChatStyles';
import MessageData from '../testData/testMessages';
import React, { useState, useEffect } from 'react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import useUserStore from '../../components/UserContext';

const COMETCHAT_APPID = '25579388a65f32e7'
const COMETCHAT_AUTHKEY = 'dca323479e4634f3626d04753a10521f35a5c1cc';

const ChatPage = ({navigation}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  let user = new CometChat.User("1");
  console.log("user: ", user)
						user.setName("jdoe");

						CometChat.createUser(user, COMETCHAT_AUTHKEY).then(
						    user => {
						        console.log("user created", user);
						    }, error => {
						        console.log("error", error);
						    }
						)

  userID = '1' 
  useEffect(() => {
      fetchMessages();

      const listenerID = "unique-listener-id";
      CometChat.addMessageListener(
          listenerID,
          new CometChat.MessageListener({
              onTextMessageReceived: message => {
                  setMessages(prevMessages => [message, ...prevMessages]);
              }
          })
      );

      return () => {
          CometChat.removeMessageListener(listenerID);
          CometChat.logout();
      };
  }, []);

  const fetchMessages = () => {
      const limit = 30;
      const messagesRequest = new CometChat.MessagesRequestBuilder()
          .setUID(userID)
          .setLimit(limit)
          .build();

      messagesRequest.fetchPrevious().then(
          messages => setMessages(messages),
          error => console.log("Message fetching failed with error:", error)
      );
  };

  const sendMessage = () => {
      if (input.trim() === '') return;

      const textMessage = new CometChat.TextMessage(
          userID,
          input,
          CometChat.RECEIVER_TYPE.USER
      );

      CometChat.sendMessage(textMessage).then(
          message => {
              setMessages(prevMessages => [message, ...prevMessages]);
              setInput('');
          },
          error => console.log("Message sending failed with error:", error)
      );
  };

  return (
      <View style={{ flex: 1, padding: 10 }}>
          <FlatList
              data={messages}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                  <Text style={{ margin: 5, padding: 10, backgroundColor: '#f0f0f0' }}>
                      {item.text}
                  </Text>
              )}
              inverted
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                  style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, margin: 5 }}
                  value={input}
                  onChangeText={setInput}
              />
              <Button title="Send" onPress={sendMessage} />
          </View>
      </View>
  );
    // return (
    //     <Container style={styles.container}>
            {/* <Text style={{ fontSize: 30, paddingTop: 10, padding: 15, borderBottomWidth: 1, borderBottomColor:'#cccccc' }}>Messages</Text>
            <FlatList
                data={MessageData}
                keyExtractor={(item) => item.msgID}
                renderItem={({ item }) => (
                    <Card onPress={() => navigation.navigate('SelectedChat', {nameOfUser: item.nameOfUser})}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={{uri: item.userImg}} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName>{item.nameOfUser}</UserName>
                                    <PostTime>{item.messageTime}</PostTime>
                                </UserInfoText>
                                <MessageText>{item.messageText}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            /> */}
    //     </Container>
    // );
};

export default ChatPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});

// let receiverID = "UID";
// let messageText = "Hello world!";
// let receiverType = CometChat.RECEIVER_TYPE.USER;
// let textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);

// CometChat.sendMessage(textMessage).then(
//   message => {
//     console.log("Message sent successfully:", message);
//   }, error => {
//     console.log("Message sending failed with error:", error);
//   }
// );

// let listenerID = "UNIQUE_LISTENER_ID";

// CometChat.addMessageListener(
//   listenerID,
//   new CometChat.MessageListener({
//     onTextMessageReceived: textMessage => {
//       console.log("Text message received successfully", textMessage);
//     },
//     onMediaMessageReceived: mediaMessage => {
//       console.log("Media message received successfully", mediaMessage);
//     },
//     onCustomMessageReceived: customMessage => {
//       console.log("Custom message received successfully", customMessage);
//     }
//   })
// );

// var listenerID = "UNIQUE_LISTENER_ID";

// CometChat.removeMessageListener(listenerID);


// let UID = "UID";
// let limit = 30;
// let messagesRequest = new CometChat.MessagesRequestBuilder()
// 												.setUID(UID)
// 												.setLimit(limit)
// 												.build();

// messagesRequest.fetchPrevious().then(
//   messages => {
//     console.log("Message list fetched:", messages);
//   }, error => {
//     console.log("Message fetching failed with error:", error);
//   }
// );

// let UID = "UID";
// let messagesRequest = new CometChat.MessagesRequestBuilder()
// 												.setUID(UID)
// 												.setLimit(50)
// 												.build();
    
//                                                 let limit = 30;
//                                                 let conversationRequest = new CometChat.ConversationsRequestBuilder()
//                                                                                                         .setLimit(limit)
//                                                                                                         .build();
// CometChat.getConversation('conversationWith', 'conversationType').then(
//     conversation => {
//         console.log('conversation', conversation);
//     }, error => {
//         console.log('error while fetching a conversation', error);
//     }
// );

// CometChat.CometChatHelper.getConversationFromMessage(message).then(
//     conversation => {
//       console.log("Conversation Object", conversation);
//     }, error => {
//       console.log("Error while converting message object", error);
//     }
//   );