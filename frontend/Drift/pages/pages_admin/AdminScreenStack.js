import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-ico-material-design';

import AccountsPage from "./AccountsPage";
import DiscoverAdminPage from "./DiscoverAdminPage";
import SelectedUserPage from "./SelectedUserPage";
import SelectedItemPostPage from "./SelectedItemPost";
import SettingsAdminPage from "./SettingsAdminPage";
import LiveChatWebPage from "./LiveChatWebPage";

const AdminStack = createMaterialBottomTabNavigator();
const DiscoverAdminStack = createStackNavigator();
const AccountStack = createStackNavigator();

const AdminScreenStack = ({ navigation }) => (
    <AdminStack.Navigator 
        initialRouteName="DiscoverAdminStack"
        activeColor="#e91e63"
        barStyle={{ backgroundColor: 'white' }}
    >
        <AdminStack.Screen
            name="Discover Admin Stack"
            component={DiscoverAdminScreenStack}
            options={{
                tabBarLabel: 'Admin Discover',
                tabBarIcon: ({ color }) => (
                    <Icon name="world-shape-public-symbol" color={color} size={26} />
                ),
            }}
        />
        <AdminStack.Screen
            name="Accounts Stack"
            component={AccountScreenStack}
            options={{
                tabBarLabel: 'Accounts',
                tabBarIcon: ({ color }) => (
                    <Icon name="user-shape" color={color} size={26} />
                ),
            }}
        />
        <AdminStack.Screen
            name="Settings Admin Stack"
            component={SettingsScreenStack}
            options={{
                tabBarLabel: 'Admin Settings',
                tabBarIcon: ({ color }) => (
                    <Icon name="bubble-speech-with-three-lines" color={color} size={26} />
                ),
            }}
        />
    </AdminStack.Navigator>
);

// Additional Stacks & Screens
const DiscoverAdminScreenStack = ({ navigation }) => {
    return (
        <PaperProvider>
            <DiscoverAdminStack.Navigator initialRouteName="">
                <DiscoverAdminStack.Screen 
                    name="Admin Discover"
                    component={DiscoverAdminPage}
                    options={{
                        tabBarLabel: 'Admin Discover',
                        tabBarIcon: ({ color }) => (
                            <Icon name="world-shape-public-symbol" color={color} size={26} />
                        ),
                    }}
                />
                <DiscoverAdminStack.Screen
                    name="Selected Item Post"
                    component={SelectedItemPostPage}
                    options={{
                        headerBackTitleVisible: false,
                    }}
                />
            </DiscoverAdminStack.Navigator>
        </PaperProvider>
    );
}

const SettingsScreenStack = ({ navigation }) => {
    return (
        <PaperProvider>
          <AccountStack.Navigator initialRouteName="AccountsPage">
            <AccountStack.Screen 
              name="Admin Settings"
              component={SettingsAdminPage}
              options={{
                  tabBarLabel: 'Admin Settings',
                  tabBarIcon: ({ color }) => (
                      <Icon name="user-shape" color={color} size={26} />
                  ),
              }}
            />
            <AccountStack.Screen
              name="Admin - Live Support Chat"
              component={LiveChatWebPage}
              options={{
                headerBackTitleVisible: false,
              }}
            />
          </AccountStack.Navigator>
        </PaperProvider>
    );
};

const AccountScreenStack = ({ navigation }) => {
    return (
        <PaperProvider>
          <AccountStack.Navigator initialRouteName="AccountsPage">
            <AccountStack.Screen 
              name="Accounts Management"
              component={AccountsPage}
              options={{
                  tabBarLabel: 'Accounts',
                  tabBarIcon: ({ color }) => (
                      <Icon name="user-shape" color={color} size={26} />
                  ),
              }}
            />
            <AccountStack.Screen
              name="Selected User"
              component={SelectedUserPage}
              options={{
                headerBackTitleVisible: false,
              }}
            />
          </AccountStack.Navigator>
        </PaperProvider>
    );
};

export default AdminScreenStack;