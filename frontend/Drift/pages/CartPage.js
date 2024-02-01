import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator, Alert } from "react-native";
import CartListItem from '../components/CartListItem';
//import API calls here for selectTotal
import { useStripe } from '@stripe/stripe-react-native';
import testCartItems from './testData/testCartItems';

//const CartTotals = () => {
const CartTotals = (cartItems) => {
// cartItem parameter ^^ only for demonstrating display. Use following API calls in the future ->
  
  //const subtotal = {Some API call}
  //const deliveryFee = {Some API call}
  //const total = {Some API call}


  //***Temporary Logic ****/
  let subtotal = 0;
  for (const item of cartItems) {
    subtotal += item.price;
  }
  let deliveryFee = 5;
  let total = subtotal + deliveryFee;
  //***********************/

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{deliveryFee} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  )
}

const onCheckout = async () => {
  //Create payment intent

  //Initialize payment sheet

  //Present the payment sheet from stripe

  //Authorize info & create order
  //onCreateOrder();
}

const CartPage = ({navigation}) => {

  //const subtotal = {Some API call}
  //const deliveryFee = {Some API call}
  //const total = {Some API call}
  
  const [cartItems, setCartItems] = React.useState([]);
  const fetchCartItems = async () => {
    // try {
    //   {console.log('fetchCartItems')}
    //   const response = await axios.get('/cartItems/getCartItems'); 
    //   setCartItems(response.data); 
    // } catch (error) {
    //   console.error('Error fetching items:', error);
    // }

    //***Temporary Logic ****/
    setCartItems(testCartItems)
    //***********************/
  };

  React.useEffect(() => {
    fetchCartItems();
  }, []);

    return (
      <>
        <FlatList
        data = {cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={CartTotals(cartItems)}
        />
        <Pressable onPress={onCheckout} style={styles.button}>
          <Text style={styles.buttonText}>
            Checkout
          </Text>
        </Pressable>
      </>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },

  button: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default CartPage;
