import React from "react";
import SearchPanel from "./SearchPanel";
import SortPanel from "./SortPanel";
import FilterPanel from "./FilterPanel";
import "../styles/SortSearchFilter.styles.scss";

const SortSearchFilterPanel = ({ type }) => {
  let panel = "";

  switch (type) {
    case "search":
      panel = <SearchPanel />;
      break;
    case "sort":
      panel = <SortPanel />;
      break;
    case "filter":
      panel = <FilterPanel />;
      break;
    default:
      panel = null;
      break;
  }

  return (
    <div className="panel">{type ? <div className="panel-flex">{panel}</div> : null}</div>
  );
};

export default SortSearchFilterPanel;
