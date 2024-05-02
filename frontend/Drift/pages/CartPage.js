import React, {createContext, useContext, useReducer, useEffect, useState }from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator, Alert } from "react-native";
import CartListItem from '../components/CartListItem';
import { useCart, CartProvider } from '../components/CartContext';
import AddressEntrySheet from '../components/AddressEntrySheet';
import TotalsSheet from '../components/TotalsSheet';
import salesTaxRates from '../components/salesTaxDict';
import useUserStore from "../components/UserContext";
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import configs from '../config';

const CartPage = ({navigation}) => {

  const API_URL = configs[0].API_URL;

  const { cart, dispatch } = useCart();
  const [cartItems, setCartItems] = React.useState([]);
  const [showTotalsSheet, setShowTotalsSheet] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [salesTax, setSalesTax] = useState(0);
  const [showAddressEntrySheet, setShowAddressEntrySheet] = useState(false);
  const userID = useUserStore((state) => state.userID);
  const customerName = (useUserStore((state) => state.firstName) + ' ' + useUserStore((state) => state.lastName));


  useEffect(() => {
    setCartItems(cart.items);
  }, [cart]);

  let subtotal = 0;
   for (const item of cart.items) {
     subtotal += item.price;
   }

  const {initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleAddressEntrySubmit = async (addressData) => {
    // Handle address entry submission logic
    console.log('Submitted address data:', addressData);

    setAddressData(addressData); // Save address data
    setShowAddressEntrySheet(false);
    const percentage = calculateSalesTax(addressData);
    const calculatedSalesTax = subtotal * percentage;
    setSalesTax(calculatedSalesTax);
    onCheckout();
  };

  const calculateSalesTax = (addressData) => {

    return salesTaxRates[addressData.state];

  };

  const updateSoldStatus = async (itemID) => {

    try {
      await axios.post(API_URL + `/items/updateSoldStatus/id/${itemID}`, {
        soldStatus: 1
      });
    }
    catch(error) {
      console.error(error);
    }

  }

   const onCreateOrder = async (total, salesTax) => {

    let addressString = '';

    if (addressData.addressLine2 !== '') {
      addressString = `${addressData.address} ${addressData.addressLine2}, ${addressData.city}, ${addressData.state}, ${addressData.zipCode}`;
    } else {
      addressString = `${addressData.address}, ${addressData.city}, ${addressData.state}, ${addressData.zipCode}`;
    }

    try {
      for (const item of cart.items) {

        const sellerID = item.userID;
        const itemID = item.itemID;
  
  
        // Make the API call for each item
        const response = await axios.post(API_URL + '/order/insertOrder', {
          'userID': userID,
          'customerName': customerName,
          'billingAddress': addressString,
          'shippingAddress': addressString,
          'itemCount': 1,
          'items': itemID,
          'orderStatus': 1,
          'totalPrice': parseFloat(total).toFixed(2),
          'sellerID': sellerID,
          'salesTax': parseFloat(salesTax).toFixed(2)
        });
  
        console.log(response);
  
        //Change sold status to 1 for item
        updateSoldStatus(itemID);

      }
  
      // Clear cart context after all items are processed
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.log(error);
    }

   };

   const handleCloseTotalsSheet = async() => {
    setShowTotalsSheet(false);
    onCheckout();
};

  const onCheckout = async () => {
    //Create payment intent

    if (!showAddressEntrySheet && !showTotalsSheet) {
      // Show the address entry sheet
      setShowAddressEntrySheet(true);
      return;
    }

    if(!showTotalsSheet) {
      setShowTotalsSheet(true);
    }

    if(!showAddressEntrySheet && showTotalsSheet) {
      response = new Object();

      const total = subtotal + salesTax;

      try {
          response = await axios.post(API_URL + '/payment/intent', {
          amount: Math.floor(total * 100),
        });
        console.log(response);
      } catch(error) {
        console.log(error);
      }
      //Initialize payment sheet
    
      const { error: paymentSheetError } = await initPaymentSheet({
        merchantDisplayName: 'Drift',
        paymentIntentClientSecret: response.data.paymentIntent,
        returnURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab',
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
        onCreateOrder(total, salesTax);
      }

      setTimeout(() => {
        navigation.navigate('Discover');
      }, 500);
    }

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
        ListFooterComponent={
        <View style={styles.totalsContainer}>
          <View style={styles.row}>
            <Text style={styles.text}>Subtotal</Text>
            <Text style={styles.text}>{subtotal.toFixed(2)} US$</Text>
          </View>
        </View>}
        />
        <Pressable onPress={onCheckout} style={styles.button}>
          <Text style={styles.buttonText}>
            CHECKOUT
          </Text>
        </Pressable>
        {showAddressEntrySheet && (
        <AddressEntrySheet
          onSubmit={ (addressData) => {
            handleAddressEntrySubmit(addressData);
            console.log(salesTax); 
          }}
        />
      )}
      {showTotalsSheet && <TotalsSheet 
          subtotal={subtotal} 
          salesTax={salesTax} 
          onClose={handleCloseTotalsSheet}/>
      }
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
    fontWeight: 'bold',
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
