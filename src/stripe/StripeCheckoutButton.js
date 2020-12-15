import React from "react";
import StripeCheckout from "react-stripe-checkout";
import logo from "../pictures/brewdog-logo.png";
import "./StripeCheckoutButton.styles.scss";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_nNzbAuFaynuQdJ53u1O5WCol00I0JmYG2d";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay with card"
      name="Punk Beer Co."
      billingAddress
      shippingAddress
      image={logo}
      description={`Total Payable: £${price}`}
      amount={priceForStripe}
      currency="GBP"
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      ComponentClass="div"
    >
      <button className="stripe-checkout-button">Pay with Card</button>
    </StripeCheckout>
  );
};

export default StripeCheckoutButton;
