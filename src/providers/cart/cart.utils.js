export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToAdd.id);

    if (existingCartItem) {
        // function's return value
        return cartItems.map(item => {
            // map method's return value
            if (item.id === cartItemToAdd.id) {
                return { ...item, quantity: item.quantity + 1 };
            } else {
                return item;
            }
        });
    }

    // else return the cart items and modify the cartItemToAdd
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    return cartItems.filter(item => item.id !== cartItemToClear.id);
}

export const subtractItemFromCart = (cartItems, cartItemToSubtract) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToSubtract.id);

    if (existingCartItem.quantity > 1) {
        // function's return value
        return cartItems.map(item => {
            // map method's return value
            if (item.id === cartItemToSubtract.id) {
                return { ...item, quantity: item.quantity - 1 };
            } else {
                return item;
            }
        });
    }

    // else return the cart items by clearing item from cartItems
    return [...clearItemFromCart(cartItems, cartItemToSubtract)];
}

export const getCartItemsCount = cartItems => {
    return cartItems.reduce((accumulatedQuantity, item) => accumulatedQuantity + item.quantity, 0);
};

export const getCartTotal = cartItems => {
    return cartItems.reduce((accumulatedTotal, item) => {
        return accumulatedTotal + (item.quantity * item.price)
    }, 0);
}