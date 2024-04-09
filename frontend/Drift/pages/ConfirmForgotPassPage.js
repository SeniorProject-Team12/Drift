import React, { useState } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Alert } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SignUpInputField from "../components/signUpInputBox";
import CustomButton from "../components/customButton";
import configs from "../config";

const ForgotPassConfirmationPage = ({ navigation, route }) => {
    const { email } = route.params;
    const [code, setCode] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newPassConfirm, setNewPassConfirm] = useState("");

    const handleSubmit = async () => {
        if(newPass != newPassConfirm) {
            Alert.alert("Passwords do not match. Please try again.");
            return;
        }

        try {
            const res = await axios.post(configs[0].API_URL + '/user/resetPasswordConfimation', { emailAddress: email, newPassword: newPass, verificationCode: code });

            if (res.data == "Verification code does not match.") {
                Alert.alert("The verification code was incorrect!");
            } else if(res.data == "Verification code has expired.") {
                Alert.alert("The verification code has expired.  Please try agein.");
                navigation.navigate('LoginPage');
            } else if (res.data == "Password reset was successful.") {
                Alert.alert("Password has been successfully reset.  Please login with new credentials now!");
                navigation.navigate('LoginPage');
            } else {
                Alert.alert("Something went wrong.  Please try again later.");
            }
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 25 }}
            >
            <Text
            style={{
                fontSize: 30,
                fontWeight: '500',
                color: '#333',
                marginBottom: 30,
                paddingTop: 100
            }}>
                Reset Password Confirmation
            </Text> 
            <SignUpInputField
                label={'Verification Code'}
                icon={
                    <MaterialIcons
                        name="domain-verification"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                }
                onChangeText={(val) => setCode(val)}
            />
            <SignUpInputField
                label={'New Password'}
                icon={
                    <Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                }   
                inputType="password"
                onChangeText={(val) => setNewPass(val)}
            />
            <SignUpInputField
                label={'Confirm New Password'}
                icon={
                    <Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                }
                inputType="password"
                onChangeText={(val) => setNewPassConfirm(val)}
            />

            <CustomButton 
                label={'Submit'}
                onPress={() => { handleSubmit() }} 
            />
            {/* <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 30,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                    <Text style={{color: '#8fcbbc', fontWeight: '700', fontSize: 14}}>RESEND CODE</Text>
                </TouchableOpacity>
            </View> */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 30,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                    <Text style={{color: '#8fcbbc', fontWeight: '700', fontSize: 14}}>BACK TO LOGIN</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgotPassConfirmationPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
});