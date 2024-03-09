import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import FolderCard from "../components/FolderCard";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 3 - 20;

const Folders = ({ folders, navigation}) => {
  
  const renderFolder = ({ item }) => {
    return <FolderCard folder={item} cardWidth={cardWidth} navigation={navigation} />
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={folders}
        renderItem={renderFolder}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
      />
    </View>
  );
};

export default Folders;