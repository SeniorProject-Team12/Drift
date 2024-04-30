// TotalsSheet.js

import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';

const TotalsSheet = ({ subtotal, salesTax, onClose }) => {

    const total = (subtotal + salesTax);

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Totals</Text>
                    <Text style={styles.subtotal}>Subtotal: ${subtotal}</Text>
                    <Text style={styles.subtotal}>Sales Tax: ${salesTax.toFixed(2)}</Text>
                    <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                    <Pressable style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>
                                CONTINUE
                            </Text>
                    </Pressable>
                </View>
            </View>
        </View>
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
        alignSelf: 'center',
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
    subtotal: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    total: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20

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
});

export default TotalsSheet;