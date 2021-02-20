import React from 'react';
import StripCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IMnfkCmtXJzEz6ngfetSJu0QdB7pfYBf7fhuRVO3wLrALnYdV9mLULL58Og7Uzr6JtkcuTm8BZrVgsVL4I9dSsi00awEygKzG';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
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