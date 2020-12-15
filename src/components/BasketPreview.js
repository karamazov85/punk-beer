import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BasketItemPreview from "./BasketPreviewItem";
import { BasketContext } from "../providers/BasketProvider";
import "../styles/BasketPreview.styles.scss";
import { PayPalButton } from "react-paypal-button-v2";
import StripeCheckoutButton from "../stripe/StripeCheckoutButton";

const BasketPreview = () => {
  const {
    basketItems,
    basketTotal,
    basketItemsCount,
    toggleHidden,
    currencyCode,
    currencySign,
  } = useContext(BasketContext);

  const history = useHistory();

  return (
    <div className="basket-preview-panel">
      <div className="basket-preview-header">
        <div className="basket-items-number-container">
          <span>Items in your basket:</span>
          <span className="basket-preview-items-number">
            {basketItemsCount}
          </span>
        </div>
        <span className="close-basket-preview" onClick={toggleHidden}>
          {" "}
          &#9547;{" "}
        </span>
      </div>
      <div className="basket-item-container">
        {basketItems
          ? Object.values(basketItems).map((beer) => (
              <BasketItemPreview key={beer.id} beer={beer} />
            ))
          : null}
      </div>
      <div className="total-container">
        <span>Total (incl. tax):</span>
        <span>
          {currencySign}
          {basketTotal
            ? basketTotal.total.toFixed(2)
            : "0"}
        </span>
      </div>
      <div className="basket-preview-footer">
        <div className="payment-buttons">
          <PayPalButton
            options={{
              clientId: "sb",
              currency: currencyCode,
            }}
            className="button-paypal"
            currency="GBP"
            style={{
              layout: "horizontal",
              color: "white",
              shape: "rect",
              height: 53,
              label: "checkout",
              tagline: false,
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currencyCode,
                      value: basketTotal.total,
                    },
                  },
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                }
              });
            }}
            onApprove={(data, actions) => {
              // Capture the funds from the transaction
              return actions.order.capture().then(function (details) {
                // Show a success message to your buyer
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );

                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderID: data.orderID,
                  }),
                });
              });
            }}
          />
          <StripeCheckoutButton price={basketTotal.total} />
        </div>
        <span
          className="view-basket"
          onClick={() => {
            history.push("/basket");
            toggleHidden();
          }}
        >
          See whole basket
        </span>
      </div>
    </div>
  );
};

export default BasketPreview;
