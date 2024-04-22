import React from "react";
import axios from "axios";
import { StyleSheet, Text, TouchableOpacity, View, Alert, SafeAreaView } from 'react-native';
import { AuthContext } from "../components/context";
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignUpInputField from "../components/signUpInputBox";
import { ScrollView } from "react-native-gesture-handler";

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

	const handleForgotPass = () => {
		navigation.navigate('ForgotPasswordPage');
	}

    const loginHandle = (username, password) => {
        Login(username, password)
  	}

  	return (
    	<SafeAreaView style={styles.container}>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				style={{ paddingHorizontal: 25 }}
			>
				<Text style={styles.title}>Drift</Text>
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
					onChangeText={(val) => textInputChange(val)}
					onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
					// style={}
				/> 
				{ data.isValidUser ? null : 
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
					</Animatable.View>
				}

				{ data.isValidPassword ? null : 
					<Animatable.View animation="fadeInLeft" duration={500}>
						<Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
					</Animatable.View>
				}
				<SignUpInputField
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
				/>

				<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
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
							alignContent: 'center'
						}}
						onPress={async () => { 
							loginHandle( data.username, data.password ); 
						}}>
						<Text
							style={{
								color: 'white',
								fontSize: 26,
								textAlign: 'center',
								fontWeight: 'bold',
							}}>
								Sign In
						</Text>
						<MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
					</TouchableOpacity>
				</View>

				<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
					<TouchableOpacity
						style={{
							// backgroundColor: '#AD40AF',
							backgroundColor: '#8fcbbc',
							padding: 20,
							width: '50%',
							borderRadius: 10,
							marginBottom: 0,
							marginTop: 0,
							// marginLeft: 85,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
						onPress={() => { navigation.goBack() }}>
						<Text
							style={{
								color: 'white',
								fontSize: 16,
								textAlign: 'center',
								fontWeight: 'bold',
							}}>
								Go Back
						</Text>
						<MaterialIcons name="arrow-back-ios" size={22} color="#fff" />
					</TouchableOpacity>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						marginBottom: 30,
						paddingTop: 20
					}}>
					<Text>Forgot Password?</Text>
					<TouchableOpacity onPress={() => { handleForgotPass() }}>
						<Text style={{color: '#8fcbbc', fontWeight: '700'}}> Reset Password</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
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
		paddingBottom: 20,
        fontSize: 50,
        fontWeight: "bold",
        justifyContent: "center"
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
		paddingTop: 10
    },

	errorMsg: {
		margin: 10,
	}
});