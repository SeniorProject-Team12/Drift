import React from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Title, Caption, Paragraph, Drawer, TouchableRipple, Switch } from 'react-native-paper';
import CustomButton from "../components/customButton";

const SettingsPage = ({navigation}) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 20 }}>
                <TouchableRipple onPress={() => { toggleTheme() }}>
                    <View style={styles.preference}>
                        <Text style={{ fontSize: 20, fontWeight: '500'}}>Dark Theme</Text>
                        <View pointerEvents="none">
                            <Switch value={isDarkTheme}/>

                        </View>
                    </View>
                </TouchableRipple>
            </View>

            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Live Chat Support</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#ffffff',
                        padding: 20,
                        width: '40%',
                        borderRadius: 10,
                        marginBottom: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    onPress={() => {  }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 14,
                            textAlign: 'center',
                            alignContent: 'center',
                        }}>
                            Go to Live Chat
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Saved Payment Option</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#ffffff',
                        padding: 20,
                        width: '50%',
                        borderRadius: 10,
                        marginBottom: 20,
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                    onPress={() => {  }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 14,
                            textAlign: 'center',
                            alignContent: 'center',
                        }}>
                            Edit Saved Payment
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});