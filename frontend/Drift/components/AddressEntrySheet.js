import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Modal, TouchableOpacity, FlatList } from 'react-native';

const AddressEntrySheet = ({ onSubmit }) => {
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [stateModalVisible, setStateModalVisible] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [error, setError] = useState('');

    const statesData = [
        { id: 1, abbreviation: 'AL' },
        { id: 2, abbreviation: 'AK' },
        { id: 3, abbreviation: 'AZ' },
        { id: 4, abbreviation: 'AR' },
        { id: 5, abbreviation: 'CA' },
        { id: 6, abbreviation: 'CO' },
        { id: 7, abbreviation: 'CT' },
        { id: 8, abbreviation: 'DE' },
        { id: 9, abbreviation: 'FL' },
        { id: 10, abbreviation: 'GA' },
        { id: 11, abbreviation: 'HI' },
        { id: 12, abbreviation: 'ID' },
        { id: 13, abbreviation: 'IL' },
        { id: 14, abbreviation: 'IN' },
        { id: 15, abbreviation: 'IA' },
        { id: 16, abbreviation: 'KS' },
        { id: 17, abbreviation: 'KY' },
        { id: 18, abbreviation: 'LA' },
        { id: 19, abbreviation: 'ME' },
        { id: 20, abbreviation: 'MD' },
        { id: 21, abbreviation: 'MA' },
        { id: 22, abbreviation: 'MI' },
        { id: 23, abbreviation: 'MN' },
        { id: 24, abbreviation: 'MS' },
        { id: 25, abbreviation: 'MO' },
        { id: 26, abbreviation: 'MT' },
        { id: 27, abbreviation: 'NE' },
        { id: 28, abbreviation: 'NV' },
        { id: 29, abbreviation: 'NH' },
        { id: 30, abbreviation: 'NJ' },
        { id: 31, abbreviation: 'NM' },
        { id: 32, abbreviation: 'NY' },
        { id: 33, abbreviation: 'NC' },
        { id: 34, abbreviation: 'ND' },
        { id: 35, abbreviation: 'OH' },
        { id: 36, abbreviation: 'OK' },
        { id: 37, abbreviation: 'OR' },
        { id: 38, abbreviation: 'PA' },
        { id: 39, abbreviation: 'RI' },
        { id: 40, abbreviation: 'SC' },
        { id: 41, abbreviation: 'SD' },
        { id: 42, abbreviation: 'TN' },
        { id: 43, abbreviation: 'TX' },
        { id: 44, abbreviation: 'UT' },
        { id: 45, abbreviation: 'VT' },
        { id: 46, abbreviation: 'VA' },
        { id: 47, abbreviation: 'WA' },
        { id: 48, abbreviation: 'WV' },
        { id: 49, abbreviation: 'WI' },
        { id: 50, abbreviation: 'WY' },
    ];

    const handleStateSelection = (item) => {
        setSelectedState(item.abbreviation);
        setStateModalVisible(false);
    };


    const handleSubmit = () => {
        if (!address || !city || !selectedState || !zipCode) {
            setError('Required fields are marked by *');
            return;
        }

        const addressData = {
            address,
            addressLine2,
            city,
            state: selectedState,
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
                            placeholder="Address Line 1 *"
                            value={address}
                            placeholderTextColor="black"
                            onChangeText={setAddress}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address Line 2"
                            value={addressLine2}
                            placeholderTextColor="black"
                            onChangeText={setAddressLine2}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="City *"
                            value={city}
                            placeholderTextColor="black"
                            onChangeText={setCity}
                        />
                        <TouchableOpacity style={styles.input} onPress={() => setStateModalVisible(true)}>
                                <Text>{selectedState || 'State *'}</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Zip Code *"
                            value={zipCode}
                            placeholderTextColor="black"
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={stateModalVisible}
                onRequestClose={() => setStateModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={statesData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleStateSelection(item)}>
                                    <View style={styles.stateContainer}>
                                        <Text style={styles.stateItem}>{item.abbreviation}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxHeight: '60%',
    },
    stateContainer: {
        width: '100%',
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    stateItem: {
        fontSize: 24,
        margin: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    placeholder: {
        color: 'black',
    },
});

export default AddressEntrySheet;