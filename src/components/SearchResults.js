import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { fetchBeersAsync } from "../redux/search/searchSlice";
import { updateQueryStringWithNewPaginationParams } from "../redux/search/search.utils";
import SortSearchFilter from "./SortSearchFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import "../styles/SearchResults.styles.scss";

const SearchResults = () => {
  
  const location = useLocation()
  const { search } = location;
  const history = useHistory()
  console.log(location)

  const searchResult = useSelector(state => state.search.searchResult);
  const dispatch = useDispatch();
  
  const [newPaginationParams, setNewPaginationParams] = useState({ pageNum: 1, productsPerPage: 10 });

  useEffect(() => {
    console.log(search)
    dispatch(fetchBeersAsync(search))
  },[search])

  // useEffect(() => {
  //   const newQueryString = updateQueryStringWithNewPaginationParams(search, newPaginationParams); 
  //   dispatch(fetchBeersAsync(newQueryString))
  //   history.push()
  // },[newPaginationParams])

  return (
    <div className="browse-container">
      <div className="jumbotron-container">
        <h1>results</h1>
      </div>
      <SortSearchFilter />
      <div className="products-grid">
        {searchResult.map((beer) => (
          <ProductCard key={beer.id} beer={beer} />
        ))}
      </div>
        <div className="back-to-browse-container">
            <Link to="/" className="back-to-browse-link">
              BACK TO BROWSE
            </Link>
        </div>
      <Pagination onPaginationChange={setNewPaginationParams}/>
    </div>
  );
};

export default SearchResults;
