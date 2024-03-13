import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import AccountsPage from "./AccountsPage";
import DiscoverAdminPage from "./DiscoverAdmin";
import ChatAdminPage from "./ChatAdminPage";

const AdminStack = createMaterialBottomTabNavigator();

const AdminScreenStack = ({navigation}) => (
    <AdminStack.Navigator 
        initialRouteName="Discover"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'white' }}
    >
        <Tab.Screen
            name="DiscoverAdminPage"
            component={DiscoverAdminPage}
            options={{
                tabBarLabel: 'Admin Discover',
                tabBarIcon: ({ color }) => (
                    <Icon name="world-shape-public-symbol" color={color} size={26} />
                ),
            }}
        />
        <AdminStack.Screen
            name="ChatAdminPage"
            component={ChatAdminPage}
            options={{
                tabBarLabel: 'Admin Chat',
                tabBarIcon: ({ color }) => (
                    <Icon name="bubble-speech-with-three-lines" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="AccountsPage"
            component={AccountsPage}
            options={{
                tabBarLabel: 'Accounts',
                tabBarIcon: ({ color }) => (
                    <Icon name="user-shape" color={color} size={26} />
                ),
            }}
        />
    </AdminStack.Navigator>
);

export default AdminScreenStack;