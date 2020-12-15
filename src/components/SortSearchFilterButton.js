import React from "react";
import "../styles/SortSearchFilter.styles.scss";

const SortSearchFilterButton = ({ onClick, value, position }) => (
  <button postion={position} onClick={onClick}>
    {value}
  </button>
);

export default SortSearchFilterButton;
