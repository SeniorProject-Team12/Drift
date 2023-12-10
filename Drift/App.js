import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainTabScreen from './pages/MainTabScreen';
import { DrawerContent } from './pages/DrawerContent';
import SettingsPage from './pages/SettingsPage';
import AuthStackScreen from './pages/AuthScreenStack';
import SellerPage from './pages/SellerPage';
import CartPage from './pages/CartPage';
import ItemPage from './pages/ItemPage';

import { AuthContext } from './components/context';

const Drawer = createDrawerNavigator();

const App = () => {

    // NOTE - default username and pass is on line 68
    // TODO - create api to add user and get user to can change auth check with such values from database

    // initial login state variables
    const initialLoginState = {
    	isLoading: true,
    	username: null,
    	userToken: null
    };

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
    	SignUp: () => { },
    	Login: async (username, password) => {
        	let userToken;
        	userToken = null;
        	// default, but todo is pull from database through API call
        	if(username == 'username' && password == 'password') {
        		try {
            		// set random token currently, but pull from db once API developed
            		userToken = 'random';
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
        		// set random token currently, but pull from db once API developed
        		userToken = await AsyncStorage.getItem('userToken', userToken);
    		} catch(e) {
    			console.log(e);
        	}
      		dispatch({ type: 'GET_TOKEN', token: userToken });
    	}, 1000);
    }, []);

    if (loginState.isLoading) {
		// loading sign for userfeedback while auth determined
    	return (
        	<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          		<ActivityIndicator size={'large'} />
        	</View>
    	);
    }

    return (
    	<AuthContext.Provider value={authContext}>
        	<NavigationContainer>
        		{ loginState.userToken != null ? (
            	// Drawer container - if user logged in
				<Drawer.Navigator drawerContent={props => <DrawerContent {... props} />}>
					<Drawer.Screen name="Drift" component={MainTabScreen} />
					<Drawer.Screen name="SellerPage" component={SellerPage} />
					<Drawer.Screen name="ItemPage" component={ItemPage} />
					<Drawer.Screen name="Cart" component={CartPage} />
					<Drawer.Screen name="Settings" component={SettingsPage} />
				</Drawer.Navigator>
            	) : (
            		// signup/login screen stack
            		<AuthStackScreen />
          		)}
      		</NavigationContainer>
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