import React, { useState, useRef, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, setBasketTotal} from "../redux/basket/basketSlice";
import { addPrice, applyCurrency } from "../redux/search/search.utils";
import { useFetch } from "../redux/search/search.hooks";
import useSpinner from "./hooks/useSpinner";
import Modal from "../components/Modal";
import "../styles/BeerDetails.styles.scss";
import {
  getSelectedBeerDetails,
} from "../redux/search/search.utils";

const BeerDetails = () => {
  const [spinner, showLoadingSpinner, hideLoadingSpinner] = useSpinner();
  
  const [selectBeerData, setSelectBeerData] = useState({
    id: null, 
    name: "", 
    image_url: "", 
    abv: null, 
    ibu: "",
    price: null, 
    tagline: "", 
    description: ""
  })
  
  // get id from URL
  const params = useParams();
  const { beerId } = params;

  const history = useHistory()

  if (parseInt(beerId) > 325 || isNaN(parseInt(beerId))) {
    history.push("/beer-404")
  }
  
  // other Redux stuff
  const dispatch = useDispatch()
  const currencySign = useSelector(state => state.search.currencySign);
  const currencyCode = useSelector(state => state.search.currencyCode);

  const { beer } = useFetch(beerId)

  useEffect(() => {
    let mounted = true;
    showLoadingSpinner()
    if(beer) {
        const beerPricedInGBP = addPrice(beer)
        const beerWithCurrency = applyCurrency(beerPricedInGBP, currencyCode);
        const selectBeerData = getSelectedBeerDetails(beerWithCurrency);
        setSelectBeerData(selectBeerData)
        window.scrollTo(0, 0);
        setTimeout(() => { // give some extra time for React to repaint the DOM, we don't wanna see that
          hideLoadingSpinner()
        }, 100);
    }

    return () => {
      mounted = false 
    }

  }, [beer])
  
  useEffect(() => {
    let mounted = true;
    showLoadingSpinner()
    if(beer) {
       const beerPricedInGBP = addPrice(beer) 
       const beerWithCurrency = applyCurrency(beerPricedInGBP, currencyCode);
       const selectBeerData = getSelectedBeerDetails(beerWithCurrency);
       setSelectBeerData(selectBeerData)
       hideLoadingSpinner()
    }

    return () => {
      mounted = false 
    }
  }, [currencyCode])

  const { name, image_url, abv, ibu, price, tagline, description } = selectBeerData;

  // for shopping widget on page
  const [quantity, setQuantity] = useState(1);
  
  // for FACTSHEET modal 
  const modalRef = useRef();

  const handleQtyChange = (e) => {
    e.preventDefault();
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
    
    dispatch(addToBasket({beer, quantity}));
    dispatch(setBasketTotal())
    setQuantity(1);
  };

  return (
    <div className="container">
      {spinner}
      <div className="main">
        <div className="info-block-1">
          <div className="headline">
            <span>Meet</span>
            <h1>{name}</h1>
          </div>
        </div>
        <div className="beer-media">
          <img src={image_url} alt="beer" />
        </div>
        <div className="info-block-2">
          <h5>{tagline}</h5>
          <span>{description}</span>
          <div className="abv-price-ibu-container-box">
            <div className="alcohol">
              <span className="alcohol-headline">ABV. vol.</span>
              <div className="alcohol-value-container">
                <span className="alcohol-value">{abv}%</span>
              </div>
            </div>
            <div className="price">
              <span className="price-headline">Price</span>
              <div className="price-value-container">
                <span className="price-value">{currencySign}{price}</span>
              </div>
            </div>
            <div className="ibu">
              <span className="ibu-headline">IBU vol.</span>
              <div className="ibu-value-container">
                <span className="ibu-value">{ibu}%</span>
              </div>
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
