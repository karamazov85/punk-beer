import React from "react";
import { useDispatch } from "react-redux";
import { setPricesInNewCurrencyInSearch, setNewCurrencySignInSearch, setNewCurrencyCodeInSearch } from "../redux/search/searchSlice";
import { setPricesInNewCurrencyInBasket, setNewCurrencySignInBasket, setBasketTotal, setNewCurrencyCodeInBasket } from "../redux/basket/basketSlice";
import {
  IoLogoFacebook,
  IoLogoYoutube,
  IoLogoInstagram,
  IoLogoTwitter,
} from "react-icons/io";
import "../styles/Footer.styles.scss";

const Footer = () => {
  
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setPricesInNewCurrencyInSearch(e.target.value))
    dispatch(setNewCurrencySignInSearch(e.target.value))
    dispatch(setNewCurrencyCodeInSearch(e.target.value))
    dispatch(setPricesInNewCurrencyInBasket(e.target.value))
    dispatch(setNewCurrencySignInBasket(e.target.value))
    dispatch(setNewCurrencyCodeInBasket(e.target.value))
    dispatch(setBasketTotal())
  }

  return (
    <div className="footer-container">
      <div className="footer-menu">
        <li>About Brewdog</li>
        <li>Jobs</li>
        <li>Press Hub</li>
        <li>FAQs</li>
        <li>Ts&Cs</li>
        <li>Pricacy Policy</li>
        <li>Responsibility</li>
        <li>Modern Slavery Act</li>
        <li>Trade Enquiries</li>
        <li>Delivery Returns</li>
        <li>Contact Us</li>
        <li>Brewdog App</li>
        <li>Company Information</li>
      </div>
      <div className="country-select">
        <p>Currency:</p>
        <form>
          <select onChange={handleChange}>
            <option>GBP</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </form>
      </div>
      <div className="social-icons-grid">
        <a href="#"><IoLogoFacebook style={{ fontSize: "1.5rem" }} /></a>
        <a href="#"><IoLogoYoutube style={{ fontSize: "1.5rem" }} /></a>
        <a href="#"><IoLogoInstagram style={{ fontSize: "1.5rem" }} /></a>
        <a href="#"><IoLogoTwitter style={{ fontSize: "1.5rem" }} /></a>
      </div>
    </div>
  );
};

export default Footer;
