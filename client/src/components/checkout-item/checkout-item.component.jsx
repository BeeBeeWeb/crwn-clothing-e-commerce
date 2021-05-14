import React from 'react';
import { connect } from 'react-redux';

import { addItem, clearItemFromCart, subtractItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({item, clearItem, addItem, subtractItem}) => {
    const { imageUrl, name, quantity, price } = item;

    return (<div className='checkout-item'>
        <div className="image-container">
            <img src={imageUrl} alt="item" />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={() => subtractItem(item)}>&#10094;</div>
            <span className="value">{quantity}</span>
            <div className="arrow" onClick={() => addItem(item)}>&#10095;</div>
        </span>
        <span className="price">{price}</span>
        <div className="remove-button" onClick={() => clearItem(item)}>
            &#10005;
        </div>
    </div>)
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    subtractItem: item => dispatch(subtractItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);