import React from "react";
import { ButtonStyle } from "../styles/PaginationStyle";
import { Consumer } from "../context";

const PerPageButton = ({ productsPerPage }) => {
  return (
    <Consumer>
      {value => {
        const { setNewProductsPerPage } = value;
        return (
          <ButtonStyle
            onClick={setNewProductsPerPage.bind(this, productsPerPage)}
          >
            {productsPerPage}
          </ButtonStyle>
        );
      }}
    </Consumer>
  );
};

export default PerPageButton;
