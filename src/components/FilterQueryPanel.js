import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterSearchResultByName, filterSearchResultByMinPrice, filterSearchResultByMaxPrice, filterSearchResultByBrewDate } from "../redux/search/searchSlice";
import CustomInput from "../components/CustomInput";

const FilterQueryPanel = ({ inputParams }) => {
  const [formData, setFormData] = useState({ id: "", type: "", value: null });
  const dispatch = useDispatch()

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
        dispatch(filterSearchResultByName(formData.value));
        break;
      case "minprice":
        dispatch(filterSearchResultByMinPrice(formData.value));
        break;
      case "maxprice":
        dispatch(filterSearchResultByMaxPrice(formData.value));
        break;
      case "brewdate":
        dispatch(filterSearchResultByBrewDate(formData.value));
        break;
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
