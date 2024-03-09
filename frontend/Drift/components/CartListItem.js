//component for items in cart

import { View, Text, StyleSheet, Image } from 'react-native';


const CartListItem = ({ cartItem }) => {

    //Add function for deletion
    //

    return (
        <View style={styles.container}>
                <Image source={{ uri: cartItem.photoURL }} style={styles.image} />
    
            <View style={styles.contentContainer}>
                <Text style={styles.name}>{cartItem.name}</Text>
                <Text style={styles.itemTotal}>
                    $ {cartItem.price}
                </Text>

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
        marginLeft: 10,
    },
    image: {
        width: '40%',
        aspectRatio: 1,
    },
    name: {
        fontWeight: '500',
        fontSize: 18,
    },
    itemTotal: {
        fontSize: 16,
        marginLeft: 'auto',
        fontWeight: '500',
    },
});

export default CartListItem;

