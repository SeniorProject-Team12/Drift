import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

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

    return(
        <View>
            <Card style={{ borderRadius: 15 }} elevation={ 0 }>
                <Card.Title titleStyle={{ fontSize: 24, fontWeight: '700', marginTop: 25, marginBottom: 10 }} title={`Username: ${item.username}`} subtitleStyle={styles.text} subtitle={`User ID: ${item.userID}`} />
                <Card.Content style={{ height: "100%", flexDirection: "column", gap: "5px" }}>
                    <Text style={styles.text}>User's First & Last Name: {item.firstName} ${item.lastName}</Text>
                    <Text style={{ marginTop: 30}}>Times Reported: </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'red',
                            padding: 20,
                            width: '50%',
                            borderRadius: 10,
                            marginBottom: 20,
                            marginLeft: 90,
                            marginTop: 100,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        onPress={() => {  }}>
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