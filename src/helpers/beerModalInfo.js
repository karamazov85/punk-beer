import React from "react";

const loremIpsum =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

export const getHeadingValue = (value) =>
  typeof value === "number" ? value : null;

export const getContentValue = (value) => {
  switch (typeof value) {
    case "string":
  return <p>{value}</p>
    case "object":
      return jsxFromArray(value);
    case "number":
      return <p>{loremIpsum}</p>
    default:
      break;
  }
};

const jsxFromArray = (value) => {
  // we turn it to ES6 Set to get rid of duplicates then spread it back into an array
  return [...new Set(value)].map((item) => <p>{item}</p>);
};
