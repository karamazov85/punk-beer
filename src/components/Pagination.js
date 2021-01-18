import React, { useState, useEffect } from "react";
import PaginationButton from "./PaginationButton";
import "../styles/PaginationStyle.scss";

const Pagination = ({ onPaginationChange, onFullStockClick, renderFullStockButton }) => {
  const [pagination, setPagination] = useState({ page: 1, per_page: 10 })

  const handlePageNumClick = (e) => {
    e.preventDefault();
    setPagination({ ...pagination, page: e.target.value}) 
  };

  const handleProductsPerPageClick = (e) => {
    e.preventDefault();
    setPagination({ ...pagination, per_page: e.target.value })
  };

  useEffect(() => {
    onPaginationChange(pagination)
  }, [pagination, onPaginationChange])

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
            { renderFullStockButton ? 
              <PaginationButton onClick={() => onFullStockClick()} >
                Full stock!
              </PaginationButton> : null }
        </div>
      </div>
    </div>
  );
};

export default Pagination;
