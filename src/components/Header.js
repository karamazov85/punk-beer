import React, { useState } from "react";
import logo from "../pictures/brewdog-logo.png";
import { IoIosCart } from "react-icons/io";
import BasketPreview from "./BasketPreview";
import { Link } from "react-router-dom";
import "../styles/Header.styles.scss";

const Header = () => {
  const [showPreview, setShowPreview] = useState(false)

  const handlePreviewOpen = () => {
    setShowPreview(true)
  }

  const handlePreviewClose = () => {
    setShowPreview(false)
  }
  
  return (
    <>
      <div className="header-grid">
        <div className="logo-container">
          <Link to="/punk-beer">
            <img src={logo} alt="brewdod-logo" className="logo" />
          </Link>
        </div>
        <div className="header-menu-grid">
          <Link to="/punk-beer">
            <p>Browse</p>
          </Link>
          <Link to="/punk-beer/basket">
            <p>Basket</p>
          </Link>
          <p>
            <IoIosCart className="header-icon-cart" onClick={handlePreviewOpen} />
          </p>
        </div>
      </div>
      <div className="basket-preview-wrapper">
        {!showPreview ? null : <BasketPreview closeBasketPreview={handlePreviewClose} />}
      </div>
    </>
  );
};

export default Header;
