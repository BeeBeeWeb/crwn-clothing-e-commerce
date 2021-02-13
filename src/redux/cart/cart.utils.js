export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToAdd.id);

    if (existingCartItem) {
        // function's return value
        return cartItems.map(item => {
            // map method's return value
            if (item.id === cartItemToAdd.id) {
                return { ...item, quantity: item.quantity + 1 };
            } else {
                return item
            }
        });
    }

    // else return the cart items and modify the cartItemToAdd
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}