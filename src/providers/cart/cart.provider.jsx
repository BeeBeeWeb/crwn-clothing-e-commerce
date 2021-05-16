import React, { createContext, useState, useEffect } from 'react';

import {
    addItemToCart, subtractItemFromCart, clearItemFromCart, getCartItemsCount, getCartTotal
} from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => { },
    cartItems: [],
    addItem: () => { },
    removeItem: () => { },
    clearItem: () => { },
    cartItemsCount: 0,
    cartTotal: 0
});

const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const toggleHidden = () => setHidden(hidden => !hidden);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemCount] = useState(0);
    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(subtractItemFromCart(cartItems, item));
    const clearItem = item => setCartItems(clearItemFromCart(cartItems, item));
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        setCartItemCount(getCartItemsCount(cartItems));
    }, [cartItems]);

    useEffect(() => {
        setCartTotal(getCartTotal(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                hidden,
                toggleHidden,
                cartItems,
                addItem,
                removeItem,
                clearItem,
                cartItemsCount,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;