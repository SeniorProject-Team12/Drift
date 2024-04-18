import React from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Title, Caption, Paragraph, Drawer, TouchableRipple, Switch } from 'react-native-paper';

const SettingsPage = ({navigation}) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={{fontSize: 30, paddingBottom: 50}}>
                Settings Page
            </Text> */}
            <TouchableRipple onPress={() => {toggleTheme()}}>
                <View style={styles.preference}>
                    <Text style={{fontSize: 20}}>Dark Theme</Text>
                    <View pointerEvents="none">
                        <Switch value={isDarkTheme}/>

                    </View>
                </View>
            </TouchableRipple>
        </SafeAreaView>
    );
}

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});