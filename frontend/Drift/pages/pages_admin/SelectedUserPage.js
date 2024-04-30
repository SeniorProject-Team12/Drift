import React from 'react';
import axios from 'axios';
import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import configs from '../../config';
import { colors } from "../../assets/Colors";

const SelectedUserPage = ({ route }) => {
    console.log("Selected User PAGE");

    const { item } = route.params;
    console.log(item);

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

    const handleDeleteAccount = async () => {
        Alert.alert("Delete User Account", "Are you sure you want to delete this user's account?",[
          {
              text: 'YES', onPress: async () => {
              try{
                  const res = await axios.delete(configs[0].API_URL + '/user/deleteUser/id/' + item.userID);
                  console.log(configs[0].API_URL + '/user/deleteUser/id/' + item.userID);
                  alert("User Account has been deleted!");
                  navigation.navigate("Accounts Management");
              } catch(e) {
                  console.error('Error reporting posted item:', e);
              }
          }},
          {
            text: 'NO',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
        ]);
    };

    return(
        <View>
            <Card style={{ borderRadius: 15 }} elevation={ 0 }>
                <Card.Title titleStyle={{ fontSize: 24, fontWeight: '700', marginTop: 25, marginBottom: 10 }} title={`Username: ${item.username}`} subtitleStyle={styles.text} subtitle={`User ID: ${item.userID}`} />
                <Card.Content style={{ height: "100%", flexDirection: "column", gap: "5px" }}>
                    <Text style={styles.text}>User's First & Last Name: {item.firstName} {item.lastName}</Text>
                    <Text style={{ marginTop: 30, color: colors.red }}>Times user has been reported: {item.reportedCount}</Text>
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>

                        <TouchableOpacity
                            style={{
                                marginBottom: 20,
                                marginTop: 100,
                                backgroundColor: colors.red,
                                padding: 20,
                                width: '50%',
                                borderRadius: 10,
                            }}
                            onPress={() => { handleDeleteAccount() }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 26,
                                    textAlign: 'center',
                                    alignContent: 'center',
                                }}>
                                    Delete User Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}

export default SelectedUserPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
    text: {
        marginLeft: 0,
        marginBottom: 5,
        fontSize: 14
    },
});