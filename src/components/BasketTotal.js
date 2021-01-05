import React from "react";
import { useSelector } from "react-redux";
import TotalItem from "./TotalItem";
import StripeCheckoutButton from "../stripe/StripeCheckoutButton";
import PayPalButtonBtn from "../paypal/PayPalButtonBtn";
import "../styles/BasketTotal.styles.scss";

const BasketTotal = () => {

  const basketTotal = useSelector(state => state.basket.basketTotal);
  const currencySign = useSelector(state => state.basket.currencySign);

  return (
    <div className="TotalList">
      <div className="TotalHeader">
        <p>Order Summary</p>
      </div>
      <div className="TotalSubHeader">
        <p>Estimated shipping and tax</p>
      </div>
      <div className="TotalBody">
        <TotalItem
          totalItemId={"subTotal"}
          label={"Subtotal"}
          value={`${currencySign} ${basketTotal.subTotal.toFixed(
            2
          )}`}
          isBorder={false}
        />
        <TotalItem
          totalItemId={"tax"}
          label={"Tax"}
          value={`${currencySign} ${basketTotal.tax.toFixed(
            2
          )}`}
          isBorder={true}
        />
        <TotalItem
          totalItemId={"total"}
          label={"Total"}
          value={`${currencySign} ${basketTotal.total.toFixed(
            2
          )}`}
        />
      </div>
      <div className="TotalFooter">
        <div className="basket-payment-buttons">
          <PayPalButtonBtn
            amount={basketTotal.total}
          />
          <StripeCheckoutButton
            price={basketTotal.total.toFixed(2)}
          />
        </div>
      </div>
    </div>
  );
};

export default BasketTotal;
