import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchDataForAutoComplete } from "../redux/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "./Autocomplete";

const SearchForm = ({ selectedSearchType, name, placeholder }) => {
  const [newSearchText, setNewSearchText] = useState("");
  const [displayAutoComplete, setDisplayAutoComplete] = useState(false);
  const [options, setOptions] = useState(null);
  
  const dispatch = useDispatch();
  const dataForAutoComplete = useSelector(state => state.search.dataForAutoComplete);
  
  const history = useHistory();

  const handleInputClick = () => {
    // put the autocomplete data that we need based on searchType into component state
    setOptions(dataForAutoComplete[name]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewSearchText(e.target.value.toLowerCase());
    options && setDisplayAutoComplete(true);
  };

  const updateSearchText = (option) => {
    setNewSearchText(option);
    setDisplayAutoComplete(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/beer?${selectedSearchType}=${newSearchText}&page=1&per_page=10`);
    setNewSearchText("");
    setDisplayAutoComplete(false);
  };

  // on mount, send batch request to get data for autocomplete into redux store
  useEffect(() => {
    let mounted = true;
    dispatch(fetchDataForAutoComplete());

    return () => {
      mounted = false;
    }
  }, [dispatch]);

  return (
    <form className="searchField" onSubmit={handleSubmit}>
      <input
        className={`searchFieldInput ${
          displayAutoComplete ? "displayAutoCompleteActive" : ""
        }`}
        type={selectedSearchType}
        name={name}
        value={newSearchText}
        placeholder={placeholder}
        autoComplete="off"
        onClick={handleInputClick}
        onChange={handleChange}
      />
      <Autocomplete
        options={options}
        displayAutoComplete={displayAutoComplete}
        setDisplayAutoComplete={setDisplayAutoComplete}
        updateSearchText={updateSearchText}
        searchText={newSearchText}
      />
      <button className="searchFieldSubmit" type="Submit">
        search
      </button>
    </form>
  );
};

export default SearchForm;
