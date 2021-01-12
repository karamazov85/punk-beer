import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchBeersAsync } from "../redux/search/searchSlice";
import { updateQueryStringWithNewPaginationParams } from "../redux/search/search.utils";
import SortSearchFilter from "./SortSearchFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import "../styles/Browse.styles.scss";

const Browse = () => {
  const searchResult = useSelector(state => state.search.searchResult);
  const dispatch = useDispatch()
  const [newPaginationParams, setNewPaginationParams] = useState({ page: 1, per_page: 10 });

  useEffect(() => {
    const newQueryString = updateQueryStringWithNewPaginationParams(undefined, newPaginationParams); 
    dispatch(fetchBeersAsync(newQueryString))
  },[newPaginationParams])

  return ( 
    <div className="browse-container">
      <div className="jumbotron-container">
        <h1>browse</h1>
      </div>
      <SortSearchFilter />
      <div className="products-grid">
        {searchResult.map((beer) => (
          <ProductCard key={beer.id} beer={beer} />
        ))}
      </div>
      <Pagination onPaginationChange={setNewPaginationParams}/>
    </div>
  )
};

export default Browse;
