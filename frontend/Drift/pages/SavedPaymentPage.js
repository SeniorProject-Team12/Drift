import React from "react";
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import SignUpInputField from "../components/signUpInputBox";
import useUserStore from "../components/UserContext";

const SavedPaymentPage = ({ navigation }) => {

    const userID = useUserStore((state) => state.userID);

    const [cardName, setCardName] = React.useState("");
    const [cardNumber, setCardNumber] = React.useState("");
    const [secCode, setSecCode] = React.useState("");
    const [expiration, setExpiration] = React.useState("");

    const handleSubmitNewPaymentMethod = () => {
        try {
            console.log("Save new payment method PRESSED!");
            // if no one exists for user ---> insert new one
            // else update existing saved payment

            Alert.alert("Payment Method Saved", "The payment details entered have been saved!");
            navigation.goBack();
        } catch(e) {
            console.error("Error saving new payment method: ", e);
        }
    };

    const handleDeleteSavedPayment = () => {
        try {
            console.log("dELETE payment method PRESSED!");
            // if no one exists for user ---> insert new one
            // else update existing saved payment


            Alert.alert("Saved Payment Deleted", "The currently saved payment for this account (if any) has been deleted.");
        } catch(e) {
            console.error("Error saving new payment method: ", e);
        }
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