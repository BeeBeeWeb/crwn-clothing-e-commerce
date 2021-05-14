import React from 'react';
import StripCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IMnfkCmtXJzEz6ngfetSJu0QdB7pfYBf7fhuRVO3wLrALnYdV9mLULL58Og7Uzr6JtkcuTm8BZrVgsVL4I9dSsi00awEygKzG';

    const onToken = token => {
        console.log(token);
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response => {
            alert('payment successful');
        }).catch(error => {
            console.log('Payment Error: ', JSON.parse(error));
            alert('payment failed, please make sure to use provided credit card.');
        });
    }

    return (
        <StripCheckout
            label='Pay Now'
            name='Crown Clothing Pvt. Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;