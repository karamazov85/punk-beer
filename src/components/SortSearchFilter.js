import React, { useState } from "react";
import SortSearchFilterButton from "./SortSearchFilterButton";
import SortSearchFilterPanel from "./SortSearchFilterPanel";
import "../styles/SortSearchFilter.styles.scss"

const SortSearchFilter = () => {
  const [btnActive, setBtnActive] = useState("");
  const [border, setBorder] = useState(false);

  const handleClick = (value) => {
    setBtnActive(value);
    setBorder(true);
  };

  return (
    <div className={`sort-search-filter-container ${border ? "addBorder" : "" }`}>
      <div className="button-container">
        <SortSearchFilterButton
          value={"Sort"}
          onClick={() => handleClick("sort")}
        />
        <SortSearchFilterButton
          value={"Filter"}
          onClick={() => handleClick("filter")}
        />
        <SortSearchFilterButton
          value={"Search"}
          onClick={() => handleClick("search")}
        />
      </div>
      <SortSearchFilterPanel type={btnActive} />
    </div>
  );
};

export default SortSearchFilter;
