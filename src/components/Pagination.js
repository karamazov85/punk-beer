import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBeersAsync } from "../redux/search/searchSlice";
import PaginationButton from "./PaginationButton";
import "../styles/PaginationStyle.scss";

const Pagination = ({ onPaginationChange }) => {

 const searchParams = useSelector(state => state.search.searchParams); 
 const dispatch = useDispatch();
 const { pageNum, productsPerPage } = searchParams;

  const handlePageNumClick = (e) => {
  
    e.preventDefault();
    const newPageNum = e.target.value;
    // dispatch(fetchBeersAsync({ ...searchParams, pageNum: newPageNum}))
    onPaginationChange({ pageNum: newPageNum, productsPerPage})
  };

  const handleProductsPerPageClick = (e) => {
    e.preventDefault();
    const newProductsPerPage = e.target.value;
    // dispatch(fetchBeersAsync({ ...searchParams, productsPerPage: newProductsPerPage }))
    onPaginationChange({ pageNum, productsPerPage: newProductsPerPage })
  };

  return (
    <div className="pagination-container">
      <div className="pageNum-container">
        <span>Page:</span>
        <div className="button-list">
          <PaginationButton onClick={handlePageNumClick} value={1}>
            1
          </PaginationButton>
          <PaginationButton onClick={handlePageNumClick} value={2}>
            2
          </PaginationButton>
          <PaginationButton onClick={handlePageNumClick} value={3}>
            3
          </PaginationButton>
          <PaginationButton onClick={handlePageNumClick} value={4}>
            4
          </PaginationButton>
          <PaginationButton onClick={handlePageNumClick} value={5}>
            5
          </PaginationButton>
        </div>
      </div>
      <div className="productsPerPage-container">
        <span>Products per page:</span>
        <div className="button-list">
          <PaginationButton onClick={handleProductsPerPageClick} value={10}>
            10
          </PaginationButton>
          <PaginationButton onClick={handleProductsPerPageClick} value={20}>
            20
          </PaginationButton>
          <PaginationButton onClick={handleProductsPerPageClick} value={30}>
            30
          </PaginationButton>
          <PaginationButton onClick={handleProductsPerPageClick} value={40}>
            40
          </PaginationButton>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
