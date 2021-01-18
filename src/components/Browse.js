import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBeersAsync, fetchFullStock } from "../redux/search/searchSlice";
import { updateQueryStringWithNewPaginationParams } from "../redux/search/search.utils";
import SortSearchFilter from "./SortSearchFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import "../styles/Browse.styles.scss";
import useSpinner from "./hooks/useSpinner";

const Browse = () => {
  const [spinner, showLoadingSpinner, hideLoadingSpinner] = useSpinner();
  const searchResult = useSelector(state => state.search.searchResult);
  const dispatch = useDispatch()
  const [newPaginationParams, setNewPaginationParams] = useState({ page: 1, per_page: 10 });

  const fullStockClicked = () => {
    showLoadingSpinner()
    dispatch(fetchFullStock())
  }

  useEffect(() => {
    showLoadingSpinner()
    const newQueryString = updateQueryStringWithNewPaginationParams(undefined, newPaginationParams); 
    dispatch(fetchBeersAsync(newQueryString))
  },[newPaginationParams, dispatch])

  useEffect(() => {
    hideLoadingSpinner()
  },[searchResult])
  
  return ( 
    <div className="browse-container">
      {spinner}
      <div className="jumbotron-container">
        <h1>browse</h1>
      </div>
      <SortSearchFilter />
      <div className="products-grid">
        {searchResult.map((beer) => (
          <ProductCard key={beer.id} beer={beer} />
        ))}
      </div>
      <Pagination onPaginationChange={setNewPaginationParams} onFullStockClick={fullStockClicked}/>
    </div>
  )
};

export default Browse;
