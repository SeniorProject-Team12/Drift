import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-ico-material-design';

import DiscoverPage from './DiscoverPage';
import ChatPage from './ChatPage';
import SavedItemsPage from "./SavedItemsPage";
import PostPage from "./PostPage";
import ProfilePage from "./ProfilePage";

const DiscoverStack = createStackNavigator();
const ChatStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  // Main bottom tab navigation stack
  <Tab.Navigator
      initialRouteName="Discover"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverPage}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <Icon name="world-shape-public-symbol" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatPage}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <Icon name="bubble-speech-with-three-lines" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostPage}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({ color }) => (
            <Icon name="add-button-inside-black-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedItemsPage}
        options={{
          tabBarLabel: 'Saved Items',
          tabBarIcon: ({ color }) => (
            <Icon name="bookmark-ribbon" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="user-shape" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const DiscoverStackScreen = ({navigation}) => (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen name="Discover" component={DiscoverPage} />
    </DiscoverStack.Navigator>
);
  
const ChatStackScreen = ({navigation}) => (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Chat" component={ChatPage} />
  
    </ChatStack.Navigator>
);