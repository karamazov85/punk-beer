import React, { useContext } from "react";
import SortSearchFilter from "./SortSearchFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { SearchContext } from "../providers/SearchProvider";
import "../styles/Browse.styles.scss";

const Browse = () => {
  const { searchResults, searchComplete, setSearchComplete } = useContext(
    SearchContext
  );

  const handleClick = () => {
    setSearchComplete(false);
  };

  return (
    <div className="browse-container">
      <div className="jumbotron-container">
        <h1>browse</h1>
      </div>
      <SortSearchFilter />
      <div className="products-grid">
        {searchResults.map((beer) => (
          <ProductCard key={beer.id} beer={beer} />
        ))}
      </div>
      {searchComplete ? (
        <div className="back-to-browse-container">
          <div className="back-container">
            <button className="back-to-browse-button" onClick={handleClick}>
              BACK TO BROWSE
            </button>
          </div>
        </div>
      ) : null}
      <Pagination />
    </div>
  );
};

export default Browse;
