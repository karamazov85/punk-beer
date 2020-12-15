import React, { useState, useContext } from "react";
import CustomInput from "../components/CustomInput";
import { SearchContext } from "../providers/SearchProvider";

const FilterQueryPanel = ({ inputParams }) => {
  const [formData, setFormData] = useState({ id: "", type: "", value: null });
  const {
    filterSearchResultsByName,
    filterSearchResultsByMinPrice,
    filterSearchResultsByMaxPrice,
    filterSearchResultsByBrewDate,
  } = useContext(SearchContext);

  const handleChange = (e) => {
    setFormData({
      id: e.target.id,
      type: e.target.type,
      value: e.target.value,
      name: e.target.name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (formData.id) {
      case "beername":
        filterSearchResultsByName(formData.value);
        break;
      case "minprice":
        filterSearchResultsByMinPrice(formData.value);
        break;
      case "maxprice":
        filterSearchResultsByMaxPrice(formData.value);
      case "brewdate":
        filterSearchResultsByBrewDate(formData.value);
      default:
        break;
    }
  };

  return (
    <>
      <form className="filter-query-form" onSubmit={handleSubmit}>
        <CustomInput inputParams={inputParams} onChange={handleChange} />
        <button className="filter-query-submit" type="submit">
          Filter
        </button>
      </form>
    </>
  );
};

export default FilterQueryPanel;
