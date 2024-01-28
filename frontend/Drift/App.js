import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppScreenStack from './components/AppScreenStack';
import { DrawerContent } from './pages/DrawerContent';
import SettingsPage from './pages/SettingsPage';
import AuthStackScreen from './pages/AuthScreenStack';
import { SafeAreaProvider } from "react-native-safe-area-context";
const Drawer = createDrawerNavigator();

import axios from 'axios';
import { AuthContext } from './components/context';

const App = () => {

    // NOTE - default username and pass is on line 68
    // TODO - create api to add user and get user to can change auth check with such values from database

    // initial login state variables
    const initialLoginState = {
    	isLoading: true,
    	username: null,
    	userToken: null
    };

	const [data, setData] = React.useState([]);
	const API_URL = 'http://localhost:3000';

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

	// const login = async (username, password, e) => {
	// 	e.preventDefault();
	// 	console.log("HERE w/ " + username + " and " + password);
	// 	await fetch("http://localhost:3000/user/login", { method: 'POST', body: JSON.stringify({ username: username, password: password })})
	// 		.then((response) => response.json())
	// 		.then(result)
	// 		// .then(data => console.log(data[0]))
	// 		.catch(error => console.error(error));
	// }

    const authContext = React.useMemo(() => ({
    	SignUp: () => { },
    	Login: async (username, password) => {
        	let userToken;
        	userToken = null;
        	// default, but todo is pull from database through API call

			const options = { method: 'POST', body: JSON.stringify({ username: username, password: password })}
			console.log("Before w/ \'" + username + "\' and \'" + password + "\'");
			
			try {
				// const response = await axios.get('https://reactnative.dev/movies.json');
				const response = await fetch('http://192.168.1.54:8081/user');
				console.log(response);
				const json = await response.json();
				console.log(json);
				setData(json);
			} catch(error) {
				console.error('Error fetching data: ', error);
			}
			console.log("after");

			// fetch("http://localhost:3000/user")
			// .then((response) => response.json())
			// .then(data => console.log(data))
			// .catch(function (error) {
			// 	console.log(error);
			// 	throw error;
			// });
			// .then((result) => {
			// 	if(result != null) {
			// 		userToken = 'randomToken';
			// 		AsyncStorage.setItem('userToken', userToken);
			// 	} else {
			// 		alert("Please check your login information.");
			// 	}
			// })
			// .catch(function (error) {
			// 	console.error(error);
			// });

			// const data = login(username, password);

			// if(data != null) {
			// 	userToken = 'randomToken';
			// 	await AsyncStorage.setItem('userToken', userToken);
			// } else {
			// 	console.log("LOGIN ERROR!");
			// }

        	if(username == 'username' && password == 'password') {
        		try {
            		// set random token currently, but pull from db once API developed
            		userToken = 'randomToken';
            		await AsyncStorage.setItem('userToken', userToken);
        		} catch(e) {
            		console.log(e);
            	}
      		}
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
				<NavigationContainer>
					{ loginState.userToken != null ? (
					// Drawer container - if user logged in

						<Drawer.Navigator drawerContent={props => <DrawerContent {... props} />}>
							<Drawer.Screen name="Drift" component={AppScreenStack} />
							<Drawer.Screen name="Settings" component={SettingsPage} />
						</Drawer.Navigator>
					
					) : (
						// signup/login screen stack
						<AuthStackScreen />
					)}
				</NavigationContainer>
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