import React, { useEffect, useRef } from "react";
import "../styles/Autocomplete.styles.scss";
import { matchRegex } from "../helpers/matchRegex";

const Autocomplete = ({
      options,
      searchText,
      updateSearchText,
      displayAutoComplete,
      setDisplayAutoComplete,
    }) => {

    const autoCompleteRef = useRef()

    const populateAutoComplete = () => {
      const matchResults = options.filter((option) =>
        option && option.match(matchRegex(searchText))
      );

      if (matchResults.length < 1) {
        setDisplayAutoComplete(false);
        return;
      }

      return matchResults.map((option, i) => (
        <p
          className="autocomplete-option"
          onClick={() => updateSearchText(option)}
          key={i}
          tabIndex="0"
        >
          {option}
        </p>
      ));
    };

    const handleClickOutside = (e) => {
      if (autoCompleteRef.current && !autoCompleteRef.current.contains(e.target)) {
        setDisplayAutoComplete(false);
        updateSearchText("");
      }
    };

    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      displayAutoComplete ? <div ref={autoCompleteRef} className="autocomplete-container">{populateAutoComplete()}</div> : null
    );
}

export default Autocomplete;
