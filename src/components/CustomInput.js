import React from "react";
import "../styles/CustomInput.styles.scss";

const CustomInput = ({ inputParams, onChange }) => {
  if (inputParams.id === "beername" || inputParams.id === "beertype") {
    return (
      <input
        className="filter-query-input"
        name={inputParams.name}
        type={inputParams.type}
        placeholder={inputParams.placeholder}
        id={inputParams.id}
        required
        onChange={onChange}
      />
    );
  } else if (inputParams.id === "minprice" || inputParams.id === "maxprice") {
    return (
      <input
        className="filter-query-input"
        name={inputParams.name}
        type={inputParams.type}
        placeholder={inputParams.placeholder}
        min={inputParams.min}
        max={inputParams.max}
        step={inputParams.step}
        id={inputParams.id}
        required
        onChange={onChange}
      />
    );
  } else if (inputParams.id === "brewdate") {
    return (
      <input
        className="filter-query-input"
        name={inputParams.name}
        type={inputParams.type}
        placeholder={inputParams.placeholder}
        id={inputParams.id}
        required
        onChange={onChange}
      />
    );
  }
};

export default CustomInput;
