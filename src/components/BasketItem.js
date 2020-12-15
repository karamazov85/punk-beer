import React, { useContext } from "react";
import { BasketContext } from "../providers/BasketProvider";
import "../styles/BasketItem.styles.scss";

const BasketItem = ({ item }) => {
  const { name, image_url, quantity, price } = item;

  const {
    addToBasket,
    removeFromBasket,
    clearFromBasket,
    currencySign,
  } = useContext(BasketContext);

  return (
    <div className="BasketItemContainer">
      <div className="BasketItemNameContainer">
        <img src={image_url} alt={`image of${name}`} />
        <p>{name}</p>
      </div>
      <div className="BasketItemPriceContainer">
        <p>{`${currencySign}${price}`}</p>
      </div>
      <div className="BasketItemQuantityContainer">
        <span>
          <div className="arrow" onClick={() => removeFromBasket(item)}>
            &#10094;
          </div>
          <span className="quantity">{quantity}</span>
          <div className="arrow" onClick={() => addToBasket(item, 1)}>
            &#10095;
          </div>
        </span>
        <button
          className="btn-clear"
          type="button"
          onClick={() => clearFromBasket(item)}
        >
          Clear
        </button>
      </div>
      <div className="BasketItemTotalContainer">
        <p>{`${currencySign}${
          parseFloat((price * quantity).toFixed(1)) || 0
        }`}</p>
      </div>
    </div>
  );
};

export default BasketItem;
