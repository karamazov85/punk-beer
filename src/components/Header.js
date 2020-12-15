import React, { useContext } from "react";
import logo from "../pictures/brewdog-logo.png";
import { IoIosCart } from "react-icons/io";
import { BasketContext } from "../providers/BasketProvider";
import BasketPreview from "./BasketPreview";
import { Link } from "react-router-dom";
import "../styles/Header.styles.scss";

const Header = () => {
  const { previewHidden, toggleHidden } = useContext(BasketContext);

  return (
    <>
      <div className="header-grid">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="brewdod-logo" className="logo" />
          </Link>
        </div>
        <div className="header-menu-grid">
          <Link to="/">
            <p>Browse</p>
          </Link>
          <Link to="/basket">
            <p>Basket</p>
          </Link>
          <p>
            <IoIosCart className="header-icon-cart" onClick={toggleHidden} />
          </p>
        </div>
      </div>
      <div className="basket-preview-wrapper">
        {previewHidden ? null : <BasketPreview />}
      </div>
    </>
  );
};

export default Header;
