import React from "react";
import { useDispatch } from "react-redux";
import { setPricesInNewCurrency, setNewCurrencySign } from "../redux/search/searchSlice";
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
    dispatch(setPricesInNewCurrency(e.target.value))
    dispatch(setNewCurrencySign(e.target.value))
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
        <p>Country:</p>
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
