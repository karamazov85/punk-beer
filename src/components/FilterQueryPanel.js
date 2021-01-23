import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { validateInput } from "../redux/search/search.utils";
import InputAlert from "./InputAlert";

const FilterQueryPanel = ({ inputParams }) => {
  const [formData, setFormData] = useState({ id: "", type: "", value: null, name:"" });
  const [invalidInput, setInvalidInput] = useState(false)
  const history = useHistory()

  const handleInputClick = () => {
    setInvalidInput(false)
    
  }

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

    if(!formData.value) {
      setInvalidInput(true)
      return;
    }

    const isValid = validateInput(formData.value, formData.type)
    
    if(!isValid) {
      setInvalidInput(true)
      return;
    } 

    history.push(`/filter/beer?${formData.name || "brewed since"}=${formData.value}`)
  };

  return (
    <>
      <form className="filter-query-form" onSubmit={handleSubmit}>
        <CustomInput inputParams={inputParams} onChange={handleChange} onClick={handleInputClick}/>
        <button className="filter-query-submit" type="submit">
          Filter
        </button>
        {invalidInput ? <InputAlert /> : null}
      </form>
    </>
  );
};

export default FilterQueryPanel;
