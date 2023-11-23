import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ico-material-design';

import DiscoverPage from '../pages/DiscoverPage';
import ChatPage from '../pages/ChatPage';
import PostPage from '../pages/PostPage';
import SavedItemsPage from '../pages/SavedItemsPage';
import ProfilePage from '../pages/ProfilePage';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                showlabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ... style.shadow
                }
            }}
        >
            <Tab.Screen name="Discover" component={DiscoverPage} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Icon name="world-shape-public-symbol" />
                    </View>
                )}}
            />
            <Tab.Screen name="Chat" component={ChatPage} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Icon name="bubble-speech-with-three-lines" />
                    </View>
                )}}
            />
            <Tab.Screen name="Post" component={PostPage} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Icon name="add-button-inside-black-circle" />
                    </View>
                )}}
            />
            <Tab.Screen name="Saved Items" component={SavedItemsPage} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Icon name="bookmark-ribbon" />
                    </View>
                )}}
            />
            <Tab.Screen name="Profile" component={ProfilePage} options={{
                tabBarIcon: ({focused}) => (
                    <View>
                        <Icon name="user-shape" />
                    </View>
                )}}
            />
        </Tab.Navigator>
    );
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: '#9E3F2',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;