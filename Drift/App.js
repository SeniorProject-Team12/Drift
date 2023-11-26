import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import DiscoverStackScreen from './pages/MainTabScreen';
// import ChatStackScreen from './pages/MainTabScreen';
import MainTabScreen from './pages/MainTabScreen';
import { DrawerContent } from './pages/DrawerContent';
import SettingsPage from './pages/SettingsPage';
import AuthStackScreen from './pages/AuthScreenStack';

import { AuthContext } from './components/context';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    Login: () => {
      setUserToken('dfsd');
      setIsLoading(false);
    },
    SignOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    SignUp: () => {
      setUserToken('dfsd');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // loading indication for userfeedback while auth determined
  if (isLoading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { userToken != null ? (
          // Drawer container - if user logged in
          <Drawer.Navigator drawerContent={props => <DrawerContent {... props} />}>
            <Drawer.Screen name="Drift" component={MainTabScreen} />
            <Drawer.Screen name="Settings" component={SettingsPage} />
          </Drawer.Navigator>
          ) : (
            // signup/login screen stack
            <AuthStackScreen />
          )
        }
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