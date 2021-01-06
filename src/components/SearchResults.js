import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import SortSearchFilter from "./SortSearchFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import "../styles/Browse.styles.scss";

const SearchResults = () => {
  const searchResult = useSelector(state => state.search.searchResult);
  const searchComplete = useSelector(state => state.search.searchComplete);

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
      {searchComplete ? (
        <div className="back-to-browse-container">
          <div className="back-container">
            <Link to="/" className="back-to-browse-button">
              BACK TO BROWSE
            </Link>
          </div>
        </div>
      ) : null} 
      <Pagination />
    </div>
  );
};

export default SearchResults;
