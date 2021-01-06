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

    const handleClickOutside = (event) => {
      // console.log(ref)
      const { current: autoCompleteRef } = ref;
      console.log("fire handleClickOutside", event.target, autoCompleteRef)
      if (autoCompleteRef && !autoCompleteRef.contains(event.target)) {
        setDisplayAutoComplete(false);
      }
    };

    useEffect(() => {
      // console.log("add mousedown")
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
