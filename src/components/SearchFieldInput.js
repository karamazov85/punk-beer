import React, { useState } from 'react'
import "../styles/SearchFieldInput.styles.scss";
import InputAlert from "./InputAlert";

const searchTypes = {
    "beer_name": "text",
    "abv_gt": "number",
    "abv_lt": "number",
    "ibu_gt": "number",
    "ibu_lt": "number",
    "ebc_gt": "number",
    "ebc_lt": "number",
    "yeast": "text",
    "hops": "text",
    "malt": "text"
}

const SearchFieldInput = ({ displayAutoComplete, selectedSearchType, name, invalidInput }) => {
    const [newSearchText, setNewSearchText] = useState("");
    
    

    const handleChange = e => {
        setNewSearchText(e.target.value)
    }
    
    return (
        <>
            <input
                className={`searchFieldInput ${
                displayAutoComplete ? "displayAutoCompleteActive" : ""
                }`}
                type={searchTypes.selectedSearchType}
                name={name}
                value={newSearchText}
                placeholder={placeholder}
                autoComplete="off"
                onClick={handleInputClick}
                onChange={handleChange}
            />
            {invalidInput ? <InputAlert /> : null}
        </>
    )
}

export default SearchFieldInput;