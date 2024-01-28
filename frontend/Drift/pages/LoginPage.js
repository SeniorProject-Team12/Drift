import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Alert, SafeAreaView } from 'react-native';
import { AuthContext } from "../components/context";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignUpInputField from "../components/signUpInputBox";
// import SampleUsers from '../components/sampleUsers';

const LoginPage = ({navigation, route}) => {
    // login state variable as defined in App.js
    const { Login } = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        username: '',
    	password: '',
    	check_textInputChange: false,
    	// secureTextEntry: true,
    	isValidUser: true,
    	isValidPassword: true,
    });

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
            	...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
		// console.log(data);
    }

    // const updateSecureTextEntry = () => {
    //     setData({
    //         ...data,
    //         secureTextEntry: !data.secureTextEntry
    //     });
    // }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (username, password) => {
        Login(username, password)
  	}

  	return (
    	<SafeAreaView style={styles.container}>
        	<Text style={styles.title}>Drift</Text>
			<Text style={{ fontSize: 20, margin: 10 }}>Username</Text>
			<TextInput 
				style={styles.input} 
				onChangeText={(val) => textInputChange(val)} 
				placeholder="Username" 
				onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
			/>
{/* 			<SignUpInputField
				label={'Username'}
				icon={
					<MaterialIcons
						name="alternate-email"
						size={20}
						color="#666"
						style={{marginRight: 5}}
					/>
				}
				onChangeText={(val) => textInputChange(val)}
				onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
			/> */}
			{ data.isValidUser ? null : 
				<Animatable.View animation="fadeInLeft" duration={500}>
					<Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
				</Animatable.View>
			}

			<Text style={{ fontSize:20,  margin: 10 }}>Password</Text>
			<TextInput
				style={styles.input}
				onChangeText={(val) => handlePasswordChange(val)}
				placeholder="Password"
				secureTextEntry={true}
			/> 
			{ data.isValidPassword ? null : 
				<Animatable.View animation="fadeInLeft" duration={500}>
					<Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
				</Animatable.View>
			}
			{/* <SignUpInputField
				style={styles.input}
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
				onChangeText={(val) => handlePasswordChange(val)}
				onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
				secureTextEntry={true}
			/> */}
			<TouchableOpacity
				style={{
					// backgroundColor: '#AD40AF',
					backgroundColor: '#8fcbbc',
					padding: 20,
					width: '90%',
					borderRadius: 10,
					marginBottom: 50,
					marginTop: 50,
					marginLeft: 15,
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
				onPress={() => { loginHandle( data.username, data.password ) }}>
				<Text
					style={{
						color: 'white',
						fontSize: 30,
						textAlign: 'center',
						fontWeight: 'bold',
						//   fontFamily: 'Roboto-MediumItalic',
					}}>
						Sign In
				</Text>
				<MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
			</TouchableOpacity>
			
			{/* <Button title="Sign In" style={{ fontSize: 50 }} onPress={() => { loginHandle( data.username, data.password ) }} /> */}
			<Button title="Go Back" color={'#8fcbbc'} onPress={() => { navigation.goBack() }} />
        </SafeAreaView>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: "center",
        backgroundColor: '#ffffff'
    },

    title: {
        paddingTop: 40,
        fontSize: 50,
        fontWeight: "bold",
        justifyContent: "center"
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

	errorMsg: {
		margin: 10,
	}
});