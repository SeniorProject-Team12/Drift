import React from "react";
import { StyleSheet, Text, TextInput, View, Pressable, Button } from 'react-native';

import { AuthContext } from "../components/context";

const LoginPage = ({navigation, route}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    // const { setUserToken } = route.params;

    // login state variable as defined in App.js
    const { Login } = React.useContext(AuthContext);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Drift</Text>
        <Text style={{fontSize:20}}>Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} placeholder="Email" />
        <Text style={{fontSize:20}}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button title="Sign In" onPress={() => { Login() }} />
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