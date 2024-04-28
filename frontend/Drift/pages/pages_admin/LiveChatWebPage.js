import React from "react";
import { Text, View } from "react-native";
import { WebView } from 'react-native-webview';

const LiveChatWebPage = () => {
    return(
        <WebView source={{ uri: "https://dashboard.tawk.to/#/inbox/662409dd1ec1082f04e51302/all" }} />
    );
};

export default LiveChatWebPage;