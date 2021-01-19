import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { fetchBeersAsync } from "../redux/search/searchSlice";
import { updateQueryStringWithNewPaginationParams } from "../redux/search/search.utils";
import useSpinner from "./hooks/useSpinner";
import SortSearchFilter from "./SortSearchFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import "../styles/SearchResults.styles.scss";

const SearchResults = () => {
  const [spinner, showLoadingSpinner, hideLoadingSpinner] = useSpinner();

  const location = useLocation()
  const { search } = location;
  const history = useHistory()

  const searchResult = useSelector(state => state.search.searchResult);
  const dispatch = useDispatch();
  
  const [newPaginationParams, setNewPaginationParams] = useState({ page: 1, per_page: 10 });

  useEffect(() => {
    showLoadingSpinner()
    const queryString = updateQueryStringWithNewPaginationParams(search, newPaginationParams); 
    history.push(`/beers/search/${queryString}`)
    dispatch(fetchBeersAsync(queryString))
  },[search, newPaginationParams, dispatch])

  useEffect(() => {
    window.scrollTo(0,0);
    hideLoadingSpinner()
  }, [searchResult])


  return (
    <div className="browse-container">
      {spinner}
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
      <Pagination onPaginationChange={setNewPaginationParams} renderFullStockButton={false}/>
    </div>
  );
};

export default SearchResults;
