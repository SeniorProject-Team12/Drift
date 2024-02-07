import React, {useState} from 'react';
import Axios from 'axios';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SignUpInputField from '../components/signUpInputBox';
import CustomButton from '../components/customButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUpPage = ({navigation}) => {
    // const [date, setDate] = useState(new Date());
    // const [open, setOpen] = useState(false);
    // const [dobLabel, setDobLabel] = useState('Date of Birth');

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const [signUpStatus, setSignUpStatus] = useState("");

    const signUpHandle = (firstName, lastName, username, email, phoneNumber, password) => {
        SignUp(firstName, lastName, username, email, phoneNumber, password)
  	}

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 25 }}>
                <Text
                style={{
                    fontSize: 30,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 30,
                }}>
                    Sign Up
                </Text>

                {/* <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                    }
                    <TextInput
                        placeholder="First Name"
                        // keyboardType={keyboardType}
                        style={{flex: 1, paddingVertical: 0}}
                        onChangeText={(val) => setFirstName({ firstName: val })}
                    />
                    <TouchableOpacity onPress={fieldButtonFunction}>
                        <Text style={{color: '#8fcbbc', fontWeight: '700'}}>{fieldButtonLabel}</Text>
                    </TouchableOpacity>
                </View> */}


                {/* <SignUpInputField
                    label={'First Name'}
                    icon={
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                    }
                /> */}

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
                />

                <CustomButton 
                    label={'Sign Up'}
                    onPress={() => { 
                        console.log(firstName)
                        signUpHandle(firstName, lastName, username, email, phoneNumber, password)
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
        backgroundColor: '#8fcbbc'
    },
});