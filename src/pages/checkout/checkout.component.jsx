import React, { useContext } from 'react';

import './checkout.styles.scss';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import { CartContext } from '../../providers/cart/cart.provider';

const CheckoutPage = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    return (
        <div className='checkout-page'>
            <div className="checkout-header">
                <div className="header-blocks">
                    <span>Product</span>
                </div>
                <div className="header-blocks">
                    <span>Description</span>
                </div>
                <div className="header-blocks">
                    <span>Quantity</span>
                </div>
                <div className="header-blocks">
                    <span>Price</span>
                </div>
                <div className="header-blocks">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map(item => (
                <CheckoutItem key={item.id} item={item} />
            ))}

            <div className="total">
                <span>TOTAL: ${cartTotal}</span>
            </div>

            <div className='test-warning'>
                *Please use the following test credit card for payments*
                <br />
                4242 4242 4242 4242 - Exp: 01/24 (or any future date) - CVV: 123 (or any 3 digits)
            </div>

            <StripeCheckoutButton price={cartTotal} />
        </div>
    )
};

export default CheckoutPage;