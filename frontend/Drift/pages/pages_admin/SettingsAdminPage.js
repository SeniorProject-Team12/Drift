import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../components/context";

const SettingsAdminPage = ({navigation}) => {
    const { SignOut } = React.useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={{fontSize: 24}}>
                Chat Admin Page
            </Text> */}
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
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
                    onPress={() => { SignOut() }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 30,
                            textAlign: 'center',
                            alignContent: 'center',
                        }}>
                            Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SettingsAdminPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});