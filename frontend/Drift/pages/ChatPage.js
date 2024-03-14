import React from "react";
import { StyleSheet, Text, View, Pressable, Button, FlatList } from 'react-native';
import { Container, Card, UserInfo, UserImgWrapper, UserImg, UserInfoText, UserName, PostTime, MessageText, TextSection } from '../components/ChatStyles';
import MessageData from './testData/testMessages';


const ChatPage = ({navigation}) => {
    return (
        <Container style={styles.container}>
            <Text style={{ fontSize: 30, paddingTop: 10, padding: 15, borderBottomWidth: 1, borderBottomColor:'#cccccc' }}>Messages</Text>
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
            />
        </Container>
    );
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