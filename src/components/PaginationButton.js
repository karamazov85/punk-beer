import React from "react";
import "../styles/PaginationButtonStyle.scss";

const PaginationButton = ({ children, ...otherProps }) => (
  <button className="button-pagination" {...otherProps}>
    {children}
  </button>
);

export default PaginationButton;
