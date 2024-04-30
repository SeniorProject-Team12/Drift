import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import FolderCard from "../components/FolderCard";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 3;

const Folders = ({ files, navigation}) => {
  const [folders, setFolders] = useState(files)
  
  useEffect(() => {
    setFolders(files);
  }, [files]);

  const renderFolder = ({ item }) => {
    return <FolderCard folder={item} cardWidth={cardWidth} navigation={navigation} />
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={folders}
        renderItem={renderFolder}
        numColumns={3}
        keyExtractor={(item) => item.savedFolderID}
        contentContainerStyle={{ padding: 5 }}
      />
    </View>
  );
};

export default Folders;