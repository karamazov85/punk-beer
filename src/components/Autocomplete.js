import React, { useEffect, forwardRef } from "react";
import "../styles/Autocomplete.styles.scss";
import { matchRegex } from "../helpers/matchRegex";

const Autocomplete = forwardRef(
  (
    {
      options,
      searchText,
      updateSearchText,
      displayAutoComplete,
      setDisplayAutoComplete,
    },
    ref
  ) => {
    const populateAutoComplete = () => {
      const matchResults = options.filter((option) =>
        option.match(matchRegex(searchText))
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

    const handleClickOutside = (event) => {
      const { current: autoComplete } = ref;
      if (autoComplete && !autoComplete.contains(event.target)) {
        setDisplayAutoComplete(false);
      }
    };

    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    });

    if (!displayAutoComplete) {
      return;
    }

    return (
      <div className="autocomplete-container">{populateAutoComplete()}</div>
    );
  }
);

export default Autocomplete;
