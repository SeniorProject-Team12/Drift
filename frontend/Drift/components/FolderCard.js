import * as React from "react";
import {Image, Text} from "react-native";
import {Card } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const FolderCard = ({folder, cardWidth, navigation }) => {
  return (
    <TouchableOpacity
      style={{ width: cardWidth }}
      onPress={() => {
        navigation.navigate("Folder Details",{folder: folder });
      }}
    >
      <Card elevation={0}>
        <Card.Content>
          <Image
            source={{
              uri: 'https://freepngimg.com/thumb/folder/20-folder-png-image.png'
            }}
            style={{ width: "100%", height: 100 }}
            resizeMode="cover"
          />
          <Text>{folder.name}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default FolderCard;