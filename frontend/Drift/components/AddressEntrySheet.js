import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

const AddressEntrySheet = ({ onSubmit }) => {
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = () => {
        if (!address || !city || !state || !zipCode) {
            setError('Required fields are marked by *');
            return;
        }

        const addressData = {
            address,
            addressLine2,
            city,
            state,
            zipCode
        };
        onSubmit(addressData);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
             <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <View style={styles.overlay}>
                    <View style={styles.innerContainer}>
                    <Text style={styles.title}>Shipping Address</Text>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                        <TextInput
                            style={styles.input}
                            placeholder="Address *"
                            value={address}
                            onChangeText={setAddress}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Unit #"
                            value={addressLine2}
                            onChangeText={setAddressLine2}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="City *"
                            value={city}
                            onChangeText={setCity}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="State *"
                            value={state}
                            onChangeText={setState}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Zip Code *"
                            value={zipCode}
                            onChangeText={setZipCode}
                        />
                        <Pressable title="Submit" style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>
                                SUBMIT
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 120,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'black',
        width: '90%',
        alignSelf: 'center',
        padding: 15,
        borderRadius: 100,
        alignItems: 'center',
      },
    buttonText: {
       color: 'white',
       fontWeight: 'bold',
       fontSize: 16,
      },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default AddressEntrySheet;