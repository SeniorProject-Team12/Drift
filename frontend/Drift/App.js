import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppScreenStack from './components/AppScreenStack';
import { DrawerContent } from './pages/DrawerContent';
import SettingsPage from './pages/SettingsPage';
import OrdersPage from './pages/OrdersPage';
import AuthStackScreen from './pages/AuthScreenStack';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from '@stripe/stripe-react-native';
const Drawer = createDrawerNavigator();

import axios from 'axios';
import { AuthContext } from './components/context';

const STRIPE_KEY = 
	'pk_test_51Oe7muAh9NlzJ6kblOAtWXQxbJVim5q4EddknofdzrUzG9kWcvGP8JshwEwoafCskVAwtdzHaXwK0FKypiMgS0zl00AICSn8NI';

const App = () => {

    // initial login state variables
    const initialLoginState = {
    	isLoading: true,
    	username: null,
    	userToken: null
    };

	// const API_URL = 'http://10.0.2.2:3000';
  const API_URL = 'http://192.168.1.54:3000'

    const loginReducer = (previousState, event) => {
    	switch(event.type) {
        	case 'GET_TOKEN':
        		return {
            		...previousState,
            		userToken: event.token,
           			isLoading: false
        		};
        	case 'LOGIN':
        		return {
        			...previousState,
            		username: event.id,
            		userToken: event.token,
            		isLoading: false
        		};
        	case 'LOGOUT':
        		return {
					...previousState,
					username: null,
					userToken: null,
					isLoading: false
        		};      
        	case 'SIGNUP':
        		return {
					...previousState,
					username: event.id,
					userToken: event.token,
					isLoading: false
        		};    
    	}
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
    	SignUp: async (fName, lName, username, email, phoneNumber, pass, confirmPass) => { 
			let userToken;
			userToken = null;

			try {
				console.log("In SIGNUP w/ ", fName, lName, username, email, phoneNumber, pass, confirmPass)
				
				if(pass != confirmPass) {
					alert("Make sure password's are identical!");
				} else {
					const response = await axios.post(API_URL + '/user/signUp', {
						"firstName": fName, 
						"lastName": lName, 
						"username": username, 
						"emailAddress": email, 
						"phoneNum": phoneNumber, 
						"password": pass 
					});

					if(response.data == "ERROR: please enter correct sign up details.") {
						alert("Error in signup details.  Please check and try again!");
					} else {
						userToken = 'randomToken';
						AsyncStorage.setItem('userToken', userToken);
					}
				}
				console.log(response.data);
			} catch(error) {
				console.error(error);
			}
        	dispatch({ type: 'SIGNUP', id: username, token: userToken });
		},
    	Login: async (username, password) => {
        	let userToken;
        	userToken = null;
			
			console.log(API_URL + '/user/login');

			try {
				console.log("Before w/ \'" + username + "\' and \'" + password + "\'");
				const res = await axios.post(API_URL + '/user/login', { username: username, password: password });
				console.log("GET input user by parameters - \n\n", res.data);

				if(res.data == "Wrong password found in API!" || res.data == "Error logging in!") {
					alert("Please check your login information.  Username and/or password are incorrect!");
				} else {
					userToken = 'randomToken';
					AsyncStorage.setItem('userToken', userToken);
				}
			} catch(error) {
				console.log(error);
			}

        	// if(username == 'username' && password == 'password') {
        	// 	try {
            // 		// set random token currently, but pull from db once API developed
            // 		userToken = 'randomToken';
            // 		await AsyncStorage.setItem('userToken', userToken);
        	// 	} catch(e) {
            // 		console.log(e);
            // 	}
      		// } else {
			// 	alert("Please check your login information.  Username and/or password are incorrect!");
			// }
        	dispatch({ type: 'LOGIN', id: username, token: userToken });
    	},
        SignOut: async () => {
      		try {
        		// set random token currently, but pull from db once API developed
        		userToken = 'random';
        		await AsyncStorage.removeItem('userToken');
        	} catch(e) {
        		console.log(e);
        	}

      		dispatch({ type: 'LOGOUT' });
    	},
    }), []);

    useEffect(() => {
    	setTimeout(async () => {
        	let userToken;
        	userToken = null;
        	try {
        		userToken = await AsyncStorage.getItem('userToken', userToken);
    		} catch(e) {
    			console.log("ERROR: ", e);
        	}
      		dispatch({ type: 'GET_TOKEN', token: userToken });
    	}, 1000);""
    }, []);

    if (loginState.isLoading) {
    	return (
        	<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          		<ActivityIndicator size={'large'} />
        	</View>
    	);
    }

    return (
    	<AuthContext.Provider value={authContext}>
			<SafeAreaProvider>
				<StripeProvider publishableKey = {STRIPE_KEY}>
					<NavigationContainer>
						{ loginState.userToken != null ? (
						// Drawer container - if user logged in

							<Drawer.Navigator drawerContent={props => <DrawerContent {... props} />}>
								<Drawer.Screen name="Drift" component={AppScreenStack} />
								<Drawer.Screen name="Settings" component={SettingsPage} />
								<Drawer.Screen name="Orders" component={OrdersPage} />
							</Drawer.Navigator>
						
							) : (
								// signup/login screen stack
								<AuthStackScreen />
							)}
					</NavigationContainer>
				</StripeProvider>
			</SafeAreaProvider>
    	</AuthContext.Provider>
  	);
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3962FF',
	alignItems: 'center',
    justifyContent: 'center',
  },

});