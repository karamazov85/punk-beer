import React, { useState } from "react";
import SearchForm from "./SearchForm";
import "../styles/SearchPanel.styles.scss";

const SearchPanel = () => {
  const [searchType, setSearchType] = useState("beer_name");
  
  const handleDropdownChange = (e) => {
    e.preventDefault();
    setSearchType(e.target.value.toLowerCase());
  };

  return (
    <div className="panel-flex">
      <SearchForm selectedSearchType={searchType} />
      <form className="searchtype-dropdown">
        <label>Search by:</label>
        <div className="select-container">
          <select name="search-by" onChange={handleDropdownChange}>
          <option value="beer_name">Beer name</option>
          <option value="abv_gt">Min. abv</option>
          <option value="abv_lt">Max. abv</option>
          <option value="ibu_gt">Min. ibu</option>
          <option value="ibu_lt">Max. ibu</option>
          <option value="ebc_gt">Min. ebc</option>
          <option value="ebc_lt">Max. ebc</option>
          <option value="yeast">Yeast</option>
          <option value="hops">Hops</option>
          <option value="malt">Malt</option>
        </select>
        </div>
      </form>
    </div>
  );
};
export default SearchPanel;
