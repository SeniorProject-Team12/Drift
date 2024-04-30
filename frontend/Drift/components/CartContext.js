import React, { createContext, useContext, useReducer, useEffect } from 'react';
import useUserStore from "./UserContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const cartReducer = (state, action) => {
  switch(action.type) {
  
    case 'ADD_TO_CART':
    // Check if the item is already in the cart
    const isItemInCart = state.items.some(item => item.itemID === action.item.itemID);
    if (!isItemInCart) {
      // Item is not in the cart, add it
      return {
        ...state,
        items: [...state.items, action.item],
      };
    } else {
      alert('Item already in cart!');
      return state;
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.index),
      };
    case 'CLEAR_CART':
    return {
      ...state,
      items: [], // Set items to an empty array to clear the cart
    };
    case 'SET_USER_ID':
      return {
        ...state,
        userID: action.userID,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const loggedInUserID = useUserStore((state) => state.userID);

  useEffect(() => {
    if (state.userID && state.userID !== loggedInUserID) {
      dispatch({ type: 'CLEAR_CART' });
    }
    // Update the userID associated with the cart to the current logged-in user
    dispatch({ type: 'SET_USER_ID', userID: loggedInUserID });
  }, [loggedInUserID]);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};