import React, { useState, useContext, useRef } from "react";
import { SearchContext } from "../providers/SearchProvider";
import Autocomplete from "./Autocomplete";

const SearchForm = ({ type, name, placeholder }) => {
  const [searchText, setSearchText] = useState("");
  const [displayAutoComplete, setDisplayAutoComplete] = useState(false);

  const [options, setOptions] = useState(null);
  const {
    changeSearchText,
    dataForAutoComplete,
    setSearchComplete,
    changePageNum,
  } = useContext(SearchContext);
  const autoCompleteRef = useRef(null);

  const handleInputClick = () => {
    // get only the autocomplete data that we need based on searchType
    setOptions(dataForAutoComplete[name]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value.toLowerCase());
    options && setDisplayAutoComplete(true);
  };

  const updateSearchText = (option) => {
    console.log("OPTION", option);
    setSearchText(option);
    setDisplayAutoComplete(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeSearchText(searchText);
    changePageNum(1);
    setSearchText("");
    setDisplayAutoComplete(false);
    setSearchComplete(true);
  };

  return (
    <form className="searchField" onSubmit={handleSubmit}>
      <input
        className={`searchFieldInput ${
          displayAutoComplete ? "displayAutoCompleteActive" : ""
        }`}
        type={type}
        name={name}
        value={searchText}
        placeholder={placeholder}
        autoComplete="off"
        onClick={handleInputClick}
        onChange={handleChange}
      />
      <Autocomplete
        ref={autoCompleteRef}
        options={options}
        displayAutoComplete={displayAutoComplete}
        setDisplayAutoComplete={setDisplayAutoComplete}
        updateSearchText={updateSearchText}
        searchText={searchText}
      />
      <button className="searchFieldSubmit" type="Submit">
        search
      </button>
    </form>
  );
};

export default SearchForm;
