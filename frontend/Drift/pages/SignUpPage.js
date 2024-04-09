import React, {useState} from 'react';
import { AuthContext } from "../components/context";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SignUpInputField from '../components/signUpInputBox';
import CustomButton from '../components/customButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { profile } from '../components/UserInfo';

const SignUpPage = ({navigation}) => {
    const { SignUp } = React.useContext(AuthContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // const [signUpStatus, setSignUpStatus] = useState("");

    const signUpHandle = (firstName, lastName, username, email, phoneNumber, password, confirmPassword) => {
        SignUp(firstName, lastName, username, email, phoneNumber, password, confirmPassword)
  	}

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 25 }}>
                <Text
                style={{
                    fontSize: 30,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 30,
                    paddingTop: 20
                }}>
                    Sign Up
                </Text>

                <SignUpInputField
                    label={'First Name'}
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                    }
                    onChangeText={(val) => setFirstName(val)}
                />
                <SignUpInputField
                    label={'Last Name'}
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                    }
                    onChangeText={(val) => setLastName(val)}
                />
                <SignUpInputField
                    label={'Username'}
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                    }
                    onChangeText={(val) => setUsername(val)}
                />  
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
                <SignUpInputField
                    label={'Phone Number'}
                    icon={
                        <Ionicons
                            name="call-outline"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                    }
                    keyboardType={'numeric'}
                    onChangeText={(val) => setPhoneNumber(val)}
                />
                <SignUpInputField
                    label={'Password'}
                    icon={
                        <Ionicons
                            name="ios-lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                    }   
                    inputType="password"
                    onChangeText={(val) => setPassword(val)}
                />
                <SignUpInputField
                    label={'Confirm Password'}
                    icon={
                        <Ionicons
                            name="ios-lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                    }
                    inputType="password"
                    onChangeText={(val) => setConfirmPassword(val)}
                />

                <CustomButton 
                    label={'Sign Up'}
                    onPress={() => { 
                        console.log(firstName, lastName, username, email, phoneNumber, password, confirmPassword)
                        profile["fName"] = firstName;
                        profile["lName"] = lastName;
                        profile["email"] = email;
                        profile["username"] = username;

                        // Calls authContext to useMemo and jump to signup module
                        signUpHandle(firstName, lastName, username, email, phoneNumber, password, confirmPassword)
                    }} 
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>Already registered?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                        <Text style={{color: '#8fcbbc', fontWeight: '700'}}> Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
});