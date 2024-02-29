import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator, Alert } from "react-native";
import CartListItem from '../components/CartListItem';
//import API calls here for selectTotal
import { useStripe } from '@stripe/stripe-react-native';
import testCartItems from './testData/testCartItems';

const testPaymentIntent = 
  'pi_3OnrzUAh9NlzJ6kb1zdRHqDw_secret_hPNIuthNdBdYAbxmXJsthJTdv';


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

const CartPage = ({navigation}) => {

  //const subtotal = {Some API call}
  //const deliveryFee = {Some API call}
  //const total = {Some API call}
  
  const [cartItems, setCartItems] = React.useState([]);
  
  const {initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout = async () => {
    //Create payment intent
  
    //Initialize payment sheet
  
    //***Temporary Logic ****/
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'Drift',
      paymentIntentClientSecret: testPaymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }
    //***********************/
  
    //Present the payment sheet from stripe
    const paymentResponse = await presentPaymentSheet();

    if(paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }
  
  
    //Authorize info & create order
    //onCreateOrder();
  }

  const deleteCartItem = (index) => {
    // Logic to delete the item from the cart
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  }


  const fetchCartItems = async () => {
    // try {
    //   {console.log('fetchCartItems')}
    //   const response = await axios.get(API_URL + '/items/getCartItems'); 
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
        renderItem={({ item, index }) => 
        <CartListItem 
        cartItem={item} 
        onDelete={() => deleteCartItem(index)} // Pass onDelete callback
      />}
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
