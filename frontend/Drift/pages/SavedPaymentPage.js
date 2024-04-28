import React from "react";
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import SignUpInputField from "../components/signUpInputBox";
import useUserStore from "../components/UserContext";
import axios from "axios";
import configs from "../config";

const SavedPaymentPage = ({ navigation }) => {

    const userID = useUserStore((state) => state.userID);

    const [cardName, setCardName] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [secCode, setSecCode] = React.useState("");
    const [expiration, setExpiration] = React.useState("");

    const handleSubmitNewPaymentMethod = async () => {
        try {
            console.log("Save new payment method PRESSED!");
            // if no one exists for user ---> insert new one
            // else update existing saved payment
            const savedPayment = await axios.get(configs[0].API_URL + '/savedPaymentMethod/getSavedPaymentByuserID/id/' + userID);
            // console.log(savedPayment.data);

            if(savedPayment.data.length == 0) {
                // insert saved payment row
                // console.log("in if save payment method");
                const insertedPayment = await axios.post(configs[0].API_URL + '/savedPaymentMethod/insertSavedPayment', 
                {
                    userID: userID,
                    nameOnCard: cardName,
                    cardNum: cardNumber,
                    secCode: secCode,
                    expiration: expiration
                });
            } else {
                // console.log("in else save payment method");

                // update existing saved payment row
                console.log(savedPayment.data[0]);
                const updatePayment = await axios.post(configs[0].API_URL + '/savedPaymentMethod/updateSavedPayment/id/' + savedPayment.data[0].userID, {
                    nameOnCard: cardName,
                    cardNum: cardNumber,
                    secCode: secCode,
                    expiration: expiration
                });
                console.log("UPDATED DATA - ", updatePayment);
            }

            Alert.alert("Payment Method Saved", "The payment details entered have been saved!");
            navigation.goBack();
        } catch(e) {
            console.error("Error saving new payment method: ", e);
        }
    };

    const handleDeleteSavedPayment = async () => {
        Alert.alert("Delete Saved Payment Method", "Are you sure you want to delete the existing saved payment method?",[
            {
                text: 'YES', onPress: async () => {
                    try{
                        const res = await axios.delete(configs[0].API_URL + '/savedPaymentMethod/deleteSavedPayment/id/' + userID);
                        alert("The saved payment method has been deleted!");
                        navigation.goBack();
                    } catch(e) {
                        console.error("Error saving new payment method: ", e);
                    }
            }},
            {
              text: 'NO',
              onPress: () => console.log('No Pressed'),
              style: 'cancel',
            },
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 25 }}
            >
                {/* <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Saved Payment Page</Text>
                </View> */}
                <View style={{ paddingTop: 20 }}>
                    <SignUpInputField
                        label={'Name on Card'}
                        icon={
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color="#666"
                                style={{marginRight: 5}}
                            />
                        }
                        onChangeText={(val) => setCardName(val)}
                    />       

                    <SignUpInputField
                        label={'Card Number'}
                        icon={
                            <Ionicons
                                name="card-outline"
                                size={20}
                                color="#666"
                                style={{marginRight: 5}}
                            />
                        }
                        keyboardType={'numeric'}
                        maxLength={16}
                        onChangeText={(val) => setCardNumber(val)}
                    />       

                    <SignUpInputField
                        label={'Security Code'}
                        icon={
                            <Ionicons
                                name="card-outline"
                                size={20}
                                color="#666"
                                style={{marginRight: 5}}
                            />
                        }
                        maxLength={5}
                        keyboardType={'numeric'}
                        onChangeText={(val) => setSecCode(val)}
                    />       

                    <SignUpInputField
                        label={'Expiration'}
                        icon={
                            <Ionicons
                                name="time-outline"
                                size={20}
                                color="#666"
                                style={{marginRight: 5}}
                            />
                        }
                        onChangeText={(val) => setExpiration(val)}
                    />       
                </View>

                <View style={{  justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#8fcbbc',
                            padding: 20,
                            width: '50%',
                            borderRadius: 10,
                            marginBottom: 20,
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        onPress={() => { 
                            handleSubmitNewPaymentMethod();
                        }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'center',
                                alignContent: 'center',
                            }}>
                                Save New Payment Method
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{  justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'red',
                            borderColor: 'black',
                            borderWidth: 2,
                            padding: 20,
                            width: '40%',
                            borderRadius: 10,
                            marginBottom: 20,
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        onPress={() => { 
                            handleDeleteSavedPayment();
                        }}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 14,
                                textAlign: 'center',
                                alignContent: 'center',
                            }}>
                                Delete Saved Payment
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SavedPaymentPage;