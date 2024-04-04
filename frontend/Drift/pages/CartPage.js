import React, {createContext, useContext, useReducer, useEffect }from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator, Alert } from "react-native";
import CartListItem from '../components/CartListItem';
import { useCart, CartProvider } from '../components/CartContext';
//import API calls here for selectTotal
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import testCartItems from './testData/testCartItems';
import configs from '../config';

const testPaymentIntent = 
  'pi_3OnrzUAh9NlzJ6kb1zdRHqDw_secret_hPNIuthNdBdYAbxmXJsthJTdv';

const CartTotals = () => {

   const { cart, dispatch } = useCart();

   let subtotal = 0;
   for (const item of cart.items) {
     subtotal += item.price;
   }
   let deliveryFee = 5;
   let total = subtotal + deliveryFee;

  return (
    <CartProvider>
      <View style={styles.totalsContainer}>
        <View style={styles.row}>
          <Text style={styles.text}>Subtotal</Text>
          <Text style={styles.text}>{subtotal.toFixed(2)} US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Delivery</Text>
          <Text style={styles.text}>{deliveryFee.toFixed(2)} US$</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBold}>Total</Text>
          <Text style={styles.textBold}>{total.toFixed(2)} US$</Text>
        </View>
      </View>
    </CartProvider>
  )
}

const CartPage = ({navigation}) => {

  //const API_URL = 'http://10.0.2.2:3000';
  const API_URL = configs[0].API_URL;
  //const API_URL = '10.136.134.161:3000';


  const { cart, dispatch } = useCart();
  const [cartItems, setCartItems] = React.useState([]);

  useEffect(() => {
    setCartItems(cart.items);
  }, [cart]);

  let subtotal = 0;
   for (const item of cart.items) {
     subtotal += item.price;
   }
   let deliveryFee = 5;
   let total = subtotal + deliveryFee;
    

  const {initPaymentSheet, presentPaymentSheet } = useStripe();

   const onCreateOrder = async () => {

    //calculate item count, subtotal, total, 
    
    let itemNames = ''
    let itemCount = 0;
    for (const item of cart.items) {
      itemCount++;
      itemNames = itemNames + item.brand + '-' + item.category
    }

    let billingAddress = '1585 Hillside Drive, Reno, NV, 89503';
    let shippingAddress = '1585 Hillside Drive, Reno, NV, 89503';
    let userID = 9; //Update when authentication context is added
    let customerName = 'Christian Jackson';
    let orderStatus = 1;

    try {
      const response = await axios.post(API_URL + '/order/insertOrder', {
        'userID': userID,
        'customerName': customerName,
        'billingAddress': billingAddress,
        'shippingAddress': shippingAddress,
        'itemCount': itemCount,
        'orderStatus': orderStatus,

        //Need to edit Stored Procedure before adding these:

        //'items': itemNames,
        //'totalPrice': total, 
        //'salesTax': null, 
        //'totalShippingPrice': null, 
        //'trackingNumber': null,
      });
      console.log(response);
    } catch(error) {
      console.log(error);
    }


    //Delete items from items database
    for (const item of cart.items) {

      try {
        const response = await axios.delete(API_URL + `/items/deleteItem/id/${item.itemID}`)
        console.log(response);
      } catch(error){
        console.log(error);
      }
    }

    //Clear cart context
    
    dispatch({ type: 'CLEAR_CART' });

   };

  const onCheckout = async () => {
    //Create payment intent

    response = new Object();

    try {
        response = await axios.post(API_URL + '/payment/intent', {
        amount: Math.floor(total * 100),
      });
      console.log(response);
    } catch(error) {
      console.log(error);
    }

    console.log(response);

    //Initialize payment sheet
  
    
    const { error: paymentSheetError } = await initPaymentSheet({
      merchantDisplayName: 'Drift',
      paymentIntentClientSecret: response.data.paymentIntent,
      billingAddressCollection: 'required',
      defaultBillingDetails: {
        name: 'Christian Jackson',
      },
    });
    if (paymentSheetError) {
      console.log(paymentSheetError);
      Alert.alert('Something went wrong');
      return;
    }
  
    //Present the payment sheet from stripe
    const paymentResponse = await presentPaymentSheet();

    if(paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message
      );
      return;
    }
  
    //Authorize info and create order

    if(paymentResponse) {
      //create order
      onCreateOrder()
    }

    setTimeout(() => {
      navigation.navigate('Discover');
    }, 500);

  }

  const deleteCartItem = (index) => {
    // Logic to delete the item from the cart
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    dispatch({ type: 'REMOVE_FROM_CART', index });
    setCartItems(updatedCartItems);
    console.log('Delete Cart Items')
  }

    // Check if cart is empty
  if (cartItems.length === 0) {
    return (
      <Text style={styles.emptyCartMessage}>Your cart is empty.</Text>
    );
  }

    return (
      <CartProvider>
        <FlatList
        data = {cartItems}
        renderItem={({ item, index }) => 
        <CartListItem 
        item={item} 
        onDelete={() => deleteCartItem(index)} // Pass onDelete callback to CartListItem
      />}
        ListFooterComponent={CartTotals(cartItems)}
        />
        <Pressable onPress={onCheckout} style={styles.button}>
          <Text style={styles.buttonText}>
            Checkout
          </Text>
        </Pressable>
      </CartProvider>
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
  emptyCartMessage: {
    marginTop: 80,
    fontSize: 20,
    color: '#888', // Gray text color
    textAlign: 'center',
  },
});

export default CartPage;
