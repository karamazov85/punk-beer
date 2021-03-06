import React from "react";
import { useSelector } from "react-redux";
import BasketItem from "./BasketItem";
import BasketTotal from "./BasketTotal";
import "../styles/Basket.styles.scss";

const Basket = () => {
  const basketItems = useSelector(state => state.basket.basketItems);

  return (
    <div className="basket-container-grid">
      <div className="basket-jumbotron-grid">
        <h1>basket</h1>
      </div>
      <div className="basket-grid">
        <div className="basket-list">
          <div className="basket-list-header">
            <p className="basket-header-item">Item</p>
            <p className="basket-header-price">Price</p>
            <p className="basket-header-quantity">Quantity</p>
            <p className="basket-header-total">Total</p>
          </div>
          <div className="basket-items">
            {Object.values(basketItems).map((beer) => (
              <BasketItem key={beer.id} beer={beer} />
            ))}
          </div>
        </div>
        <BasketTotal />
      </div>
    </div>
  );
};
export default Basket;
