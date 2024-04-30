import React, { useContext } from "react";
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import Icon from 'react-native-ico-material-design';
import { AuthContext } from "../components/context";
import useUserStore from "../components/UserContext";

export function DrawerContent(props) {
    // signOut variable as assigned in App.js
    const { SignOut } = React.useContext(AuthContext);
    
    const ZusfirstName = useUserStore((state) => state.firstName);
    const ZusLastName = useUserStore((state) => state.lastName);
    const username = useUserStore((state) => state.username);

    return (
        <View style={{flex:1}}>
            {/* <UserProvider> */}
                <DrawerContentScrollView { ...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            {/* <Title style={styles.title}>{profile.fName} {profile.lName}</Title>
                            <Caption style={styles.caption}>@{profile.username}</Caption> */}

                            <Title style={styles.title}>{ZusfirstName} {ZusLastName}</Title>
                            <Caption style={styles.caption}>@{username}</Caption>

                            <Drawer.Section style={styles.drawerSection}>
                                <DrawerItem 
                                    label="Discover" 
                                    onPress={() => { props.navigation.navigate('Discover') }}
                                    icon={({color, size}) => (
                                        <Icon 
                                        name="world-shape-public-symbol"
                                        color={color}
                                        size={size}
                                        />
                                    )} 
                                />   
                                <DrawerItem 
                                    label="Chat" 
                                    onPress={() => { props.navigation.navigate('Chat') }}
                                    icon={({color, size}) => (
                                        <Icon 
                                        name="bubble-speech-with-three-lines"
                                        color={color}
                                        size={size}
                                        />
                                    )} 
                                /> 
                                <DrawerItem 
                                    label="Saved Items" 
                                    onPress={() => { props.navigation.navigate('Saved') }}
                                    icon={({color, size}) => (
                                        <Icon 
                                        name="bookmark-outline"
                                        color={color}
                                        size={size}
                                        />
                                    )} 
                                />
                                <DrawerItem 
                                    label="Orders" 
                                    onPress={() => { props.navigation.navigate('Orders') }}
                                    icon={({color, size}) => (
                                        <Icon 
                                        name="check-box"
                                        color={color}
                                        size={size}
                                        />
                                    )} 
                                />
                                <DrawerItem 
                                    label="Selling" 
                                    onPress={() => { props.navigation.navigate('Selling') }}
                                    icon={({color, size}) => (
                                        <Icon 
                                        name="receipt"
                                        color={color}
                                        size={size}
                                        />
                                    )} 
                                />
                                <DrawerItem 
                                    label="Settings" 
                                    onPress={() => { props.navigation.navigate('Settings') }}
                                    icon={({color, size}) => (
                                        <Icon 
                                        name="settings-cogwheel-button"
                                        color={color}
                                        size={size}
                                        />
                                    )} 
                                />
                            </Drawer.Section>
                        </View>
                    </View>
                </DrawerContentScrollView>

                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        label="Sign Out" 
                        onPress={() => { 
                            SignOut(); 
                        }}
                        icon={({color, size}) => (
                            <Icon 
                            name="exit-to-app-button"
                            color={color}
                            size={size}
                            />
                        )} 
                    />    
                </Drawer.Section>
            {/* </UserProvider> */}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 20,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 15,
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
});