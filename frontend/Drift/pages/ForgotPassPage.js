import React from "react";
import axios from "axios";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Alert } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SignUpInputField from "../components/signUpInputBox";
import CustomButton from "../components/customButton";
import configs from "../config";

const ForgotPasswordPage = ({ navigation }) => {
    const [email, setEmail] = React.useState("");

    const handleResetPassword = async () => {
        console.log(email);

        try {
            // TODO - create reset password route
            const res = await axios.post(configs[0].API_URL + '/user/resetPassword', { emailAddress : email });
            if(res.data == "Email sent successfully.") {
                navigation.navigate('ForgotPassConfirmationPage', {email: email});
            } else {
                Alert.alert("There was an issue resetting your password. Please try again.");
            }
        } catch(e) {
            console.error("Error in reset password: " + e);
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
                Forgot Password
            </Text> 
            <Text style={{ paddingBottom: 30 }}>Enter your email address below to reset your password for the corresponding account.</Text>
            <SignUpInputField
                label={'Email Address'}
                icon={
                    <MaterialIcons
                        name="email"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                }
                keyboardType="email-address"
                onChangeText={(val) => setEmail(val)}
            />

            <CustomButton 
                label={'Reset Password'}
                onPress={() => { handleResetPassword() }} 
            />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: 30,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                    <Text style={{color: '#8fcbbc', fontWeight: '700', fontSize: 14}}>GO BACK</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
});