import React from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { getHeadingValue, getContentValue } from "../helpers/beerModalInfo";
import "../styles/InfoBox.styles.scss";

const InfoBox = ({
  name,
  value,
  imageUrl,
  expandInfoBox,
  expandedInfoBoxName,
  closeInfoBox,
}) => {
  const headingValue = getHeadingValue(value);
  const contentValue = getContentValue(value);

  const toggle = () => {
    if (expandedInfoBoxName === name) {
      closeInfoBox();
    } else {
      expandInfoBox();
    }
  };

  return (
    <div className={`${name}`}>
      <div className="info-box-container">
        <div className="info-box-container-top">
          <img src={imageUrl} alt="icon" />
          <div className="info-wrapper">
            <h4>{name}</h4>
            <h5>{headingValue}</h5>
          </div>
          <div className="plus-minus-icon-wrapper" onClick={toggle}>
            {expandedInfoBoxName === name ? <FiMinus /> : <GoPlus />}
          </div>
        </div>
        {expandedInfoBoxName === name ? (
          <div className="info-box-container-bottom">{contentValue}</div>
        ) : null}
      </div>
    </div>
  );
};

export default InfoBox;
