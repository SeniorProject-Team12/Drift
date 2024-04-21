import React from "react";
// import { SafeAreaView, Text } from "react-native";
import { WebView } from 'react-native-webview';

const LiveChatPage = () => {

    return (
        <WebView source={{ uri: "https://tawk.to/chat/662409dd1ec1082f04e51302/1hrucd2h9" }} />
    );
}

export default LiveChatPage;