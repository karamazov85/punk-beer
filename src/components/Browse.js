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
  const [newPaginationParams, setNewPaginationParams] = useState({ pageNum: 1, productsPerPage: 10 });

  useEffect(() => {
    // // we pass in undefined for old queryString here as we are on route "/" at this stage so nothing to pass in.
    // // we will deal with this problem through guard clauses in the utility functions.
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
