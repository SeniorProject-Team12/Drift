import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SignUpInputField from '../components/signUpInputBox';
import CustomButton from '../components/customButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUpPage = ({navigation}) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dobLabel, setDobLabel] = useState('Date of Birth');

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

                <SignUpInputField
                    label={'Full Name'}
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

                <CustomButton label={'Sign Up'} onPress={() => { }} />

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