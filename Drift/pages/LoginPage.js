import React from "react";
import { StyleSheet, Text, TextInput, View, Pressable, Button, Alert} from 'react-native';
import { AuthContext } from "../components/context";
import * as Animatable from 'react-native-animatable';

import SampleUsers from '../components/SampleUsers';

const LoginPage = ({navigation, route}) => {

  // login state variable as defined in App.js
  const { Login } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
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
  }

  const updateSecureTextEntry = () => {
      setData({
          ...data,
          secureTextEntry: !data.secureTextEntry
      });
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

  const loginHandle = (username, password) => {
    Login(username, password)
      // const foundUser = SampleUsers.filter( item => {
      //     return userName == item.username && password == item.password;
      // } );

      // if ( data.username.length == 0 || data.password.length == 0 ) {
      //     Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
      //         {text: 'Okay'}
      //     ]);
      //     return;
      // }

      // if ( foundUser.length == 0 ) {
      //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
      //         {text: 'Okay'}
      //     ]);
      //     return;
      // }
      // Login(foundUser);
  }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Drift</Text>
        <Text style={{fontSize:20}}>Username</Text>
        <TextInput 
          style={styles.input} 
          onChangeText={(val) => textInputChange(val)} 
          placeholder="Username" 
          onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
        />

          { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
          }

        <Text style={{fontSize:20}}>Password</Text>

          { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
          }

        <TextInput
          style={styles.input}
          onChangeText={(val) => handlePasswordChange(val)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button title="Sign In" onPress={() => { loginHandle( data.username, data.password ) }} />
      </View>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },

    title: {
        paddingTop: 40,
        fontSize: 50,
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
});