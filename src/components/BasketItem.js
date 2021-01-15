import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, removeFromBasket, setBasketTotal, clearFromBasket } from "../redux/basket/basketSlice";
import "../styles/BasketItem.styles.scss";

const BasketItem = ({ beer }) => {
  const { name, image_url, quantity, price } = beer;
  
  const currencySign = useSelector(state => state.basket.currencySign);
  
  const dispatch = useDispatch();
  
  const leftArrowClicked = () => {
    dispatch(removeFromBasket(beer));
    dispatch(setBasketTotal());
  }

  const rightArrowClicked = () => {
    dispatch(addToBasket({beer, quantity: 1}));
    dispatch(setBasketTotal());
  }

  const clearClicked = () => {
    dispatch(clearFromBasket(beer));
    dispatch(setBasketTotal());
  }

  return (
    <div className="BasketItemContainer">
      <div className="BasketItemNameContainer">
        <img src={image_url} alt={name} />
        <p>{name}</p>
      </div>
      <div className="BasketItemPriceContainer">
        <p>{`${currencySign}${price}`}</p>
      </div>
      <div className="BasketItemQuantityContainer">
        <span>
          <div className="arrow" onClick={leftArrowClicked}>
            &#10094;
          </div>
          <span className="quantity">{quantity}</span>
          <div className="arrow" onClick={rightArrowClicked}>
            &#10095;
          </div>
        </span>
        <button
          className="btn-clear"
          type="button"
          onClick={clearClicked}
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
