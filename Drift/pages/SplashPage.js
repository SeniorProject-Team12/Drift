import React from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashStars from '../assets/splashStars.jpg';
// import Icon from 'react-native-ico-material-design';

const SplashPage = ({navigation}) => {
    return (
        <SafeAreaView
            style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
        }}>
            <View style={{marginTop: 20}}>
                <Text
                    style={{
                    //   fontFamily: 'Inter-Bold',
                    fontWeight: 'bold',
                    fontSize: 35,
                    color: '#20315f',
                }}>
                    DRIFT
                </Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {/* <SplashStars
                width={300}
                height={300}
                style={{transform: [{rotate: '-15deg'}]}}
            /> */}
            </View>
            <TouchableOpacity
                style={{
                    // backgroundColor: '#AD40AF',
                    backgroundColor: '#8fcbbc',
                    padding: 20,
                    width: '90%',
                    borderRadius: 10,
                    marginBottom: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                onPress={() => navigation.navigate('SignUpPage')}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 18,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        //   fontFamily: 'Roboto-MediumItalic',
                }}>
                    Let's Get Thrifting!
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default SplashPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});