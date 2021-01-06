import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBeersOnInit } from "../redux/search/searchSlice";
import SortSearchFilter from "./SortSearchFilter";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import "../styles/Browse.styles.scss";

const Browse = () => {
  const searchResult = useSelector(state => state.search.searchResult);
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchBeersOnInit());
  })

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
      <Pagination />
    </div>
  );
};

export default Browse;
