import React, { useContext } from "react";
import { BasketContext } from "../providers/BasketProvider";
import "../styles/BasketPreviewItem.styles.scss";

const BasketItemPreview = ({ beer }) => {
  const { addToBasket, removeFromBasket, clearFromBasket, currencySign } = useContext(
    BasketContext
  );

  const { name, price, quantity, image_url } = beer;
  return (
    <div className="basket-preview-item">
      <img className="basket-preview-img" src={image_url} />
      <div className="basket-preview-item-info">
        <span className="basket-preview-name">{name}</span>
        <span className="basket-preview-price">{currencySign}{price}</span>
        <span
          className="basket-preview-remove"
          onClick={() => clearFromBasket(beer)}
        >
          Remove from basket
        </span>
        <div className="basket-preview-item-quantity-container">
          <span>Quantity:</span>
          <div className="quantity-controller">
            <span
              className="quantity-minus"
              onClick={() => removeFromBasket(beer)}
            >
              {" "}
              &#8722;{" "}
            </span>
            <span className="quantity-number"> {quantity} </span>
            <span
              className="quantity-plus"
              onClick={() => addToBasket(beer, 1)}
            >
              {" "}
              +{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketItemPreview;
