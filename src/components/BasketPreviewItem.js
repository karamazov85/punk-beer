import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, removeFromBasket, clearFromBasket, setBasketItemsCount, setBasketTotal } from "../redux/basket/basketSlice";
import "../styles/BasketPreviewItem.styles.scss";

const BasketItemPreview = ({ beer }) => {
  
  const dispatch = useDispatch();
  const currencySign = useSelector(state => state.basket.currencySign);
  const { name, price, quantity, image_url } = beer;

  const handleAddToBasket = () => {
    dispatch(addToBasket({beer, quantity: 1}))
    dispatch(setBasketItemsCount())
    dispatch(setBasketTotal());
  }

  const handleRemoveFromBasket = () => {
    dispatch(removeFromBasket(beer));
    dispatch(setBasketItemsCount());
    dispatch(setBasketTotal());
  }

  const handleClearFromBasket = () => {
    dispatch(clearFromBasket(beer));
    dispatch(setBasketItemsCount());
    dispatch(setBasketTotal());
  }
  
  return (
    <div className="basket-preview-item">
      <img className="basket-preview-img" src={image_url} alt="product"/>
      <div className="basket-preview-item-info">
        <span className="basket-preview-name">{name}</span>
        <span className="basket-preview-price">{currencySign}{price}</span>
        <span
          className="basket-preview-remove"
          onClick={handleClearFromBasket}
        >
          Clear from basket
        </span>
        <div className="basket-preview-item-quantity-container">
          <span>Quantity:</span>
          <div className="quantity-controller">
            <span
              className="quantity-minus"
              onClick={handleRemoveFromBasket}
            >
              {" "}
              &#8722;{" "}
            </span>
            <span className="quantity-number"> {quantity} </span>
            <span
              className="quantity-plus"
              onClick={handleAddToBasket}
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
