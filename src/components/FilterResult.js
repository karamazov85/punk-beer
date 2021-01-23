import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getFilterParamsFromQuery } from "../redux/search/search.utils";
import { filterResults } from "../redux/search/searchSlice";
import useSpinner from "./hooks/useSpinner";
import SortSearchFilter from "./SortSearchFilter";
import ProductCard from "./ProductCard";
import "../styles/SearchResults.styles.scss";

const FilterResult = () => {
    const [spinner, showLoadingSpinner, hideLoadingSpinner] = useSpinner();
    const location = useLocation()
    const filterQuery = location.search; 
    const dispatch = useDispatch()
    const filteredResult = useSelector(state => state.search.filteredResult); 

    useEffect(() => {
        let mounted = true 
        showLoadingSpinner()
        const filterParams = getFilterParamsFromQuery(filterQuery);
        dispatch(filterResults(filterParams))
        hideLoadingSpinner()
        
        return () => {
            mounted = false;
        }
    },[filterQuery, dispatch])

    return (
        <div className="browse-container">
            {spinner}
        <div className="jumbotron-container">
            <h1>results</h1>
        </div>
        <SortSearchFilter />
        <div className="products-grid">
            {filteredResult.map((beer) => (
            <ProductCard key={beer.id} beer={beer} />
            ))}
        </div>
            <div className="back-to-browse-container">
                <Link to="/" className="back-to-browse-link">
                    BACK TO SEARCH
                </Link>
            </div>
        </div>
    );
};

export default FilterResult;