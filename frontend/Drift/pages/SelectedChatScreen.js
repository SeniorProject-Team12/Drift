import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, scrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';

const SelectedChatScreen = () => {
    const [messages, setMessages] = React.useState([])

    React.useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello Jordannnnnnnnn',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
            _id: 2,
            text: 'Hello world',
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
        },
      ])
    }, [])
  
    const onSend = React.useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
    }, [])

    const renderMsgBubble = (props) => {
        return(
            <Bubble 
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#8fcbbc'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }}
            />
        );
    }

    const renderSendBtn = (props) => {
        return(
            <Send {...props}>
                <View>
                    <Icon name='send-circle' size={30} color={'#8fcbbc'}  style={{ marginBottom: 8, marginRight: 5, paddingBottom: 50 }} />
                </View>
            </Send>
        );
    }

    const renderInputToolbar = (props) => {
        return(
            <InputToolbar 
                {...props}
                size={100}
                he
            />
        );
    }

    // removes drawer header, so not double header
    const navigation = useNavigation();
    React.useEffect(() => {
       navigation.getParent()?.setOptions({
         headerShown: false,
       });
       return () =>
         navigation.getParent()?.setOptions({
           headerShown: true,
         });
    }, [navigation]);

    return(
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderMsgBubble}
            renderSend={renderSendBtn}
            alwaysShowSend
            renderInputToolbar={renderInputToolbar}
            minComposerHeight={50}
            scrollToBottom
            alignTop

        />
    );
}

export default SelectedChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
})