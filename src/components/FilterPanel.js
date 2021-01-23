import React, { useState } from "react";
import FilterQueryPanel from "./FilterQueryPanel";
import "../styles/FilterPanel.styles.scss";

const FilterPanel = () => {
  const [btnActive, setBtnActive] = useState(false);
  const [inputParams, setInputParams] = useState({ type: "text" });

  const handleClick = (inputParams) => {
    setBtnActive(true);
    setInputParams(inputParams);
  };

  return (
    <>
      <ul className="PanelList">
        <li
          onClick={() =>
            handleClick({
              type: "text",
              placeholder: "Enter beer name",
              name: "beername",
              id: "beername",
            })
          }
        >
          Filter By Name
        </li>
        <li
          onClick={() =>
            handleClick({
              type: "number",
              placeholder: "Enter min. price",
              min: 0.1,
              max: 50,
              step: 0.1,
              name: "min. price",
              id: "minprice",
            })
          }
        >
          Filter By Min. Price
        </li>
        <li
          onClick={() =>
            handleClick({
              type: "number",
              placeholder: "Enter max price",
              min: 0.1,
              max: 50,
              step: 0.1,
              name: "max. price",
              id: "maxprice",
            })
          }
        >
          Filter By Max. Price
        </li>
        <li
          onClick={() =>
            handleClick({
              type: "select",
              placeholder: "Enter a date",
              name: "brewed since",
              id: "brewdate",
            })
          }
        >
          Brewed Since
        </li>
      </ul>
      <div className="filter-query-panel-wrapper">
        {btnActive ? (
          <FilterQueryPanel
            inputParams={inputParams}
            closePanel={() => setBtnActive(false)}
          />
        ) : null}
      </div>
    </>
  );
};

export default FilterPanel;
