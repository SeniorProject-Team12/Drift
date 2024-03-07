//component for items in cart
import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useCart } from './CartContext'


const CartListItem = ({ item, onDelete }) => {

    const { dispatch } = useCart();
    
    const handleRemoveItem = () => {

        //Callback function defined in PostPage.js
        onDelete();
    };

    return (
        <View style={styles.container}>
                <Image source={{ uri: item.photoURL }} style={styles.image} />
    
            <View style={styles.contentContainer}>
                <View style={styles.itemInfo}>
                    <Text style={styles.name}>{item.brand + ' - ' + item.category}</Text>
                    <Text style={styles.itemTotal}>
                        $ {item.price}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                <Pressable onPress={handleRemoveItem}>
                    <Text style={styles.removeButton}>Remove</Text>
                </Pressable>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10,
        width: '100%'
    },
    itemInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    buttonContainer: {
        margin: 'auto'
    },
    image: {
        width: '40%',
        aspectRatio: 1,
    },
    name: {
        fontWeight: '500',
        fontSize: 18,
        maxWidth: 150
    },
    itemTotal: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 'auto',
    },
    removeButton: {
        color: 'red',
        fontWeight: '500',
        marginTop: 20,
    },
});

export default CartListItem;

