import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, setBasketTotal} from "../redux/basket/basketSlice";
import Modal from "../components/Modal";
import "../styles/BeerDetails.styles.scss";
import {
  getSelectedBeerDetails,
} from "../redux/search/search.utils";

const BeerDetails = () => {
  const params = useParams();
  const beerId = parseInt(params.beerId);
  const searchResult = useSelector(state => state.search.searchResult)
  const beer = searchResult.find(beer => beer.id === beerId);
  const selectBeerData = getSelectedBeerDetails(beer)
  const { name, image_url, abv, ibu, price, tagline, description } = selectBeerData;
  const currencySign = useSelector(state => state.search.currencySign);
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef();

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

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity === 0) {
      return;
    }
    
    dispatch(addToBasket({beer, quantity}));
    dispatch(setBasketTotal())
    setQuantity(1);
  };

  // async function checkAndFetchBeer() {
  //   console.log("MOUNTED")
  //   let currentBeer = {};
    
  //   // if user arrives here from Browse page
  //   if (searchResult) {
  //     currentBeer = searchResult.find(beer => beer.id === beerId);
  //   } else {
  //     // BUG: with 'else' it's not fired at all, even when it should be.
  //     currentBeer = await fetchBeerByBeerId(beerId)
  //   }
    
  //   const selectedBeerDetails = getSelectedBeerDetails(currentBeer);
  //   setBeer(selectedBeerDetails);
  // }

  // useEffect(() => {
  //   checkAndFetchBeer();
  // }, []);


  return (
    <div className="container">
      <div className="main">
        <div className="info-block-1">
          <div className="headline">
            <span>Meet</span>
            <h1>{name}</h1>
          </div>
        </div>
        <div className="beer-media">
          <img src={image_url} alt="beer image" />
        </div>
        <div className="info-block-2">
          <h5>{tagline}</h5>
          <span>{description}</span>
          <div className="abv-price-ibu-container-box">
            <div className="alcohol">
              <span className="alcohol-headline">ABV. vol.</span>
              <span className="alcohol-value">{abv}%</span>
            </div>
            <div className="price">
              <span className="price-headline">Price</span>
            <span className="price-value">{currencySign}{price}</span>
            </div>
            <div className="ibu">
              <span className="ibu-headline">IBU vol.</span>
              <span className="ibu-value">{ibu}%</span>
            </div>
          </div>
          <div className="full-details-container">
            <p className="full-details" onClick={() => modalRef.current.open()}>
              Full factsheet
            </p>
          </div>
        </div>
        {beer && <Modal ref={modalRef} selectBeerData={selectBeerData} />}
      </div>
      <form onSubmit={handleSubmit} className="shop-widget-form">
        <div className="shop-quantity-controller">
          <button
            className="shop-widget-minus"
            type="button"
            onClick={decrementValue}
          >
            {" "}
            -{" "}
          </button>
          <input
            type="number"
            className="shop-widget-quantity"
            value={quantity}
            onChange={handleQtyChange}
          />
          <button
            className="shop-widget-plus"
            type="button"
            onClick={incrementValue}
          >
            {" "}
            +{" "}
          </button>
        </div>
        <button className="shop-add-button" type="Submit">
          Add to basket
        </button>
      </form>
    </div>
  );
};

export default BeerDetails;
