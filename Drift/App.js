import React, { useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-ico-material-design';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/Login';

import { AuthContext } from './components/context';

const App = () => {
  var isSignedIn = false;

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

  if (isLoading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
  <AuthContext.Provider value={authContext}>
      { userToken != null ? (
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      ) : (
        <LoginPage />
      )}
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
