import React from "react";
import { useDispatch } from "react-redux";
import { sortSearchResultAtoZ, sortSearchResultZtoA, sortSearchResultByDate, sortByAbvHighToLow, sortByAbvLowToHigh } from "../redux/search/searchSlice";

const SortPanel = () => {
  const dispatch = useDispatch()

  return (
    <ul className="PanelList">
      <li onClick={() => dispatch(sortSearchResultByDate())}>
        First Brewed Date (Newest first)
      </li>
      <li onClick={() => dispatch(sortSearchResultAtoZ())}>Name A-Z</li>
      <li onClick={() => dispatch(sortSearchResultZtoA())}>Name Z-A</li>
      <li onClick={() => dispatch(sortByAbvLowToHigh())}>ABV Low To High</li>
      <li onClick={() => dispatch(sortByAbvHighToLow())}>ABV High To Low</li>
    </ul>
  );
};

export default SortPanel;
