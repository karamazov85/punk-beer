import React from "react";
import { ButtonStyle } from "../styles/PaginationStyle";
import { Consumer } from "../context";

const PageNumButton = ({ pageNumber }) => {
  return (
    <Consumer>
      {value => {
        const { setNewPage } = value;
        return (
          <ButtonStyle onClick={setNewPage.bind(this, pageNumber)}>
            {pageNumber}
          </ButtonStyle>
        );
      }}
    </Consumer>
  );
};

export default PageNumButton;
