import React, { useContext } from "react";
import { SearchContext } from "../providers/SearchProvider";

const SortPanel = () => {
  const {
    sortSearchResultsByDate,
    sortSearchResultsAtoZ,
    sortSearchResultsZtoA,
    sortSearchResultsByABVlowToHigh,
    sortSearchResultsByABVHighToLow,
  } = useContext(SearchContext);

  return (
    <ul className="PanelList">
      <li onClick={sortSearchResultsByDate}>
        First Brewed Date (Newest first)
      </li>
      <li onClick={sortSearchResultsAtoZ}>Name A-Z</li>
      <li onClick={sortSearchResultsZtoA}>Name Z-A</li>
      <li onClick={sortSearchResultsByABVlowToHigh}>ABV Low To High</li>
      <li onClick={sortSearchResultsByABVHighToLow}>ABV High To Low</li>
    </ul>
  );
};

export default SortPanel;
