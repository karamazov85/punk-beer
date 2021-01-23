import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { filterSearchResultByName, filterSearchResultByMinPrice, filterSearchResultByMaxPrice, filterSearchResultByBrewDate } from "../redux/search/searchSlice";
import CustomInput from "../components/CustomInput";

const FilterQueryPanel = ({ inputParams }) => {
  const [formData, setFormData] = useState({ id: "", type: "", value: null, name:"" });
  const dispatch = useDispatch()
  const history = useHistory()

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
    history.push(`/filter/beer?${formData.name}=${formData.value}`)
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
