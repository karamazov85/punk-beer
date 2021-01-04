import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import "../styles/BeerDetails.styles.scss";
import { BasketContext } from "../providers/BasketProvider";

import {
  fetchBeerByBeerId,
  getSelectedBeerDetails,
} from "../redux/search/search.utils";

const BeerDetails = () => {
  const params = useParams();
  const beerId = parseInt(params.beerId);
  const searchResult = useSelector(state => state.search.searchResult)
  const beer = searchResult.find(beer => beer.id === beerId);
  const selectBeerData = getSelectedBeerDetails(beer)
  const currencySign = useSelector(state => state.search.currencySign);
  
  // const { addToBasket } = useContext(BasketContext);
  // const [beer, setBeer] = useState({
  //   id: null,
  //   name: "",
  //   image_url: "",
  //   abv: null,
  //   ibu: null,
  //   target_og: null,
  //   hops: "",
  //   malt: "",
  //   yeast: "",
  //   price_GBP: null,
  //   price: null,
  //   tagline: "",
  //   description: "",
  // });

  const { id, name, image_url, abv, ibu, price, tagline, description } = selectBeerData;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity === 0) {
      return;
    }
    
    // addToBasket(beer, quantity);
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
