import React, { useContext } from 'react';

import { CartContext } from '../../providers/cart/cart.provider';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
    const { imageUrl, name, quantity, price } = item;
    const { addItem, removeItem, clearItem } = useContext(CartContext);

    return (<div className='checkout-item'>
        <div className="image-container">
            <img src={imageUrl} alt="item" />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={() => removeItem(item)}>&#10094;</div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={() => addItem(item)}>&#10095;</div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={() => clearItem(item)}>
            &#10005;
        </div>
    </div>)
};

export default CheckoutItem;