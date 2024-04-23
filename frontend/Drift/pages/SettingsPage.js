import React from "react";
import axios from "axios";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TouchableRipple, Switch } from 'react-native-paper';
import { useFocusEffect } from "@react-navigation/native";
import useUserStore from "../components/UserContext";
import configs from "../config";


const SettingsPage = ({navigation}) => {
    const userID = useUserStore((state) => state.userID);

    const [cardName, setCardName] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [secCode, setSecCode] = React.useState("");
    const [expiration, setExpiration] = React.useState("");
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const fetchSavedPaymentMethod = async () => {
        try {
            const savedPayment = await axios.get(configs[0].API_URL + '/savedPaymentMethod/getSavedPaymentByuserID/id/' + userID);
            // console.log("HERE WITH NAME - ", savedPayment.data[0].nameOnCard);
            
            if(savedPayment.data.length == 0) {
                setCardName("No payment found.");
            }  else {
                setCardName(savedPayment.data[0].nameOnCard);
                setCardNumber(savedPayment.data[0].cardNumber);
                setExpiration(savedPayment.data[0].expirationDate);
                setSecCode(savedPayment.data[0].securityCode);
            }             
        } catch(e) {
            console.error("ERROR: ", e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            // fetchAllOrders();
            fetchSavedPaymentMethod();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 20 }}>
                <TouchableRipple onPress={() => { toggleTheme() }}>
                    <View style={styles.preference}>
                        <Text style={{ fontSize: 20, fontWeight: '500'}}>Dark Theme</Text>
                        <View pointerEvents="none">
                            <Switch value={isDarkTheme}/>
                        </View>
                    </View>
                </TouchableRipple>
            </View>

            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Live Chat Support</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#ffffff',
                        padding: 20,
                        width: '40%',
                        borderRadius: 10,
                        marginBottom: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    onPress={() => { navigation.navigate('Live Chat Support') }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 14,
                            textAlign: 'center',
                            alignContent: 'center',
                        }}>
                            Go to Live Chat
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Saved Payment Option</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#ffffff',
                        padding: 20,
                        width: '50%',
                        borderRadius: 10,
                        marginBottom: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    onPress={() => { 
                        navigation.navigate('Edit Saved Method of Payment');
                    }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 14,
                            textAlign: 'center',
                            alignContent: 'center',
                        }}>
                            Edit Saved Payment
                    </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={{
                            backgroundColor: '#ffffff',
                            padding: 20,
                            width: '55%',
                            borderRadius: 10,
                            marginBottom: 20,
                            marginTop: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    onPress={() => { 
                        fetchSavedPaymentMethod();
                    }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 14,
                            textAlign: 'center',
                            alignContent: 'center',
                        }}>
                            Show Saved Payment
                    </Text>
                </TouchableOpacity>                     */}
                {(() => {
                    if (cardName == "No payment found."){
                        return(<Text style={{ fontSize: 16, padding: 5 }}>You currently have no saved payment method.</Text>);
                    } else if (cardName != "") {
                        // has saved payment

                        return(
                            <>
                            <Text style={{ fontSize: 14 }}>{`Name on Card: ${cardName}`}</Text>
                            <Text style={{ fontSize: 14 }}>{`Card Number: XXXX XXXX XXXX ${cardNumber.slice(-4)}`}</Text>
                            <Text style={{ fontSize: 14 }}>{`Expiration Date: ${expiration}`}</Text>
                            </>
                        );
                    } 
                })()}
            </View>
        </SafeAreaView>
    );
}

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});