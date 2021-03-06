import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setBasketItemsCount } from "../redux/basket/basketSlice";
import BasketItemPreview from "./BasketPreviewItem";
import "../styles/BasketPreview.styles.scss";
import { PayPalButton } from "react-paypal-button-v2";
import StripeCheckoutButton from "../stripe/StripeCheckoutButton";

const BasketPreview = ({ closeBasketPreview }) => {
  
  const basketItems = useSelector(state => state.basket.basketItems);
  const basketTotal = useSelector(state => state.basket.basketTotal);
  const currencyCode = useSelector(state => state.basket.currencyCode);
  const currencySign = useSelector(state => state.basket.currencySign);
  const basketItemsCount = useSelector(state => state.basket.basketItemsCount);
  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    dispatch(setBasketItemsCount());
    return () => {
      mounted = false;
    }
  },[dispatch])

  return (
    <div className="basket-preview-panel">
      <div className="basket-preview-header">
        <div className="basket-items-number-container">
          <span>Items in your basket:</span>
          <div>
            <span className="basket-preview-items-number">
              {basketItemsCount}
            </span>
          </div>
        </div>
        <span className="close-basket-preview" onClick={closeBasketPreview}>
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
            closeBasketPreview()
          }}
        >
          See whole basket
        </span>
      </div>
    </div>
  );
};

export default BasketPreview;
