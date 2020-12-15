import React from "react";
import "../styles/BasketTotalItem.styles.scss";

const TotalItem = ({ label, value }) => (
  <div className="TotalItemContainer">
    <p className="TotalItemLabel">{label}</p>
    <p className="TotalItemValue">{value}</p>
  </div>
);

export default TotalItem;
