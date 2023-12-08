import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./LoginPage";
import SplashPage from "./SplashPage";
import SignUpPage from "./SignUpPage";

const AuthStack = createStackNavigator();

const AuthStackScreen = ({navigation}) => (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="SplashPage" component={SplashPage} />
        <AuthStack.Screen name="LoginPage" component={LoginPage} />
        <AuthStack.Screen name="SignUpPage" component={SignUpPage} />
    </AuthStack.Navigator>
);

export default AuthStackScreen;