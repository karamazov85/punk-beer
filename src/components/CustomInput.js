import React from "react";
import "../styles/CustomInput.styles.scss";

const CustomInput = ({ inputParams, onChange, onClick }) => {
  if (inputParams.id === "beername" || inputParams.id === "beertype") {
    return (
      <input
        className="filter-query-input"
        name={inputParams.name}
        type={inputParams.type}
        placeholder={inputParams.placeholder}
        id={inputParams.id}
        onChange={onChange}
        onClick={onClick}
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
        onChange={onChange}
      />
    );
  } else if (inputParams.id === "brewdate") {
    return (
      // <input
      //   className="filter-query-input"
      //   name={inputParams.name}
      //   type={inputParams.type}
      //   placeholder={inputParams.placeholder}
      //   id={inputParams.id}
      //   onChange={onChange}
      // />
      <select className="filter-query-input" onChange={onChange}>
        <option name="brewed since" value="2003">2003</option>
        <option name="brewed since" value="2004">2004</option>
        <option name="brewed since" value="2005">2005</option>
        <option name="brewed since" value="2006">2006</option>
        <option name="brewed since" value="2007">2007</option>
        <option name="brewed since" value="2008">2008</option>
        <option name="brewed since" value="2009">2009</option>
        <option name="brewed since" value="2010">2010</option>
        <option name="brewed since" value="2011">2011</option>
        <option name="brewed since" value="2012">2012</option>
        <option name="brewed since" value="2013">2013</option>
        <option name="brewed since" value="2014">2014</option>
        <option name="brewed since" value="2015">2015</option>
      </select>
    );
  }
};

export default CustomInput;
