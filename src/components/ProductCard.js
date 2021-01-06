import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, setBasketTotal } from "../redux/basket/basketSlice";
import "../styles/ProductCard.scss";

const ProductCard = ({ beer }) => {
  const { name, tagline, abv, first_brewed, image_url, price, id } = beer;
  const [quantity, setQuantity] = useState(1);
  const currencySign = useSelector(state => state.search.currencySign);
  const dispatch = useDispatch();

  const handleQtyChange = (e) => {
    const quantityFromForm = parseInt(e.target.value);
    setQuantity(quantityFromForm);
  };

  const decrementValue = (e) => {
    e.preventDefault();
    if (quantity === 1) {
      return;
    }
    setQuantity((quantity) => quantity - 1);
  };

  const incrementValue = (e) => {
    e.preventDefault();
    setQuantity((quantity) => quantity + 1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (quantity === 0) {
      return;
    }
    dispatch(addToBasket({beer, quantity}));
    dispatch(setBasketTotal())
    setQuantity(1);
  };

  let history = useHistory();

  return (
    <>
      <div className="product-card">
        <div className="product-card-inner">
          <div
            className="product-info-container"
            onClick={() => history.push(`/beerDetails/${id}`)}
          >
            <h1 className="beer-name">{name}</h1>
            <p className="beer-type">{tagline}</p>
            <p className="beer-alcohol">{abv}%</p>
            <p className="first-brewed">First brewed: {first_brewed}</p>
          </div>
          <div
            className="beer-image-container"
            onClick={() => history.push(`/${id}`)}
          >
            <img src={image_url} alt="beer" />
          </div>
          <div
            className="price-container"
            onClick={() => history.push(`/${id}`)}
          >
            <h1>
              {currencySign}
              {price}
            </h1>
          </div>
          <div className="form-container">
            <form onSubmit={onSubmit}>
              <div className="qty-control-container">
                <button
                  className="minus-sign"
                  type="button"
                  onClick={decrementValue}
                >
                  {" "}
                  -{" "}
                </button>
                <input
                  type="number"
                  className="qty-number"
                  value={quantity}
                  onChange={handleQtyChange}
                />
                <button
                  className="plus-sign"
                  type="button"
                  onClick={incrementValue}
                >
                  {" "}
                  +{" "}
                </button>
              </div>
              {/* <IoIosCart className="icon-cart" /> */}
              <button className="btn-add" type="Submit">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
