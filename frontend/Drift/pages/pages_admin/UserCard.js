import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

const UserCard = ({ item, cardWidth, showInfo, navigation }) => {
    console.log("User card rendered w/", item);
    const showReported = item.reportedCount > 0;

    return(
      <TouchableOpacity
        style={{ width: cardWidth }}
        onPress={() => {
          navigation.navigate('Selected User', {item: item});
        }}
      >
        <Card elevation={ 0 } style={{ marginTop: 15, backgroundColor: 'white' }}>
          <Card.Content>
            <Text style={{ fontSize: 16, paddingBottom: 15, fontWeight: '600'}}>{`User ID - ${item.userID}`}</Text>
            {showInfo && <Text>{`Username: ${item.username}`}</Text>}
            <Text>{`User Email Address: ${item.emailAddress}`}</Text>
            {showReported && <Text style={{ color: 'red', justifyContent: 'center', flexDirection: 'row', paddingTop: 10 }}>REPORTED USER</Text>}

          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
};

export default UserCard;