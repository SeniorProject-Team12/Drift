import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const cartReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.item],
      };
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
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};