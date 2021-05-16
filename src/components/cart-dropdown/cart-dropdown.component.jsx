import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import { CartContext } from '../../providers/cart/cart.provider';

const CartDropdown = ({ history }) => {
    const { cartItems, toggleHidden } = useContext(CartContext);
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    (cartItems.length
                        ? cartItems.map(item => (<CartItem key={item.id} item={item} />))
                        : <span className='empty-message'>Your cart is empty!</span>)
                }
            </div>
            
            <CustomButton onClick={() => {
                history.push('/checkout');
                toggleHidden();
            }}>GO TO CHECKOUT</CustomButton>
        </div>
    );
};

export default withRouter(CartDropdown);