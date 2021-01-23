export const searchInputTypes = {
  beer_name: {
    type: "text",
    name: "name",
    placeholder: "Search the catalogue by beer name...",
    valid_input: "string"
  },
  abv_gt: {
    type: "number",
    name: "abv_gt",
    placeholder: "Search beers with abv higher than...",
    valid_input: "number"
  },
  abv_lt: {
    type: "number",
    name: "abv_lt",
    placeholder: "Search beers with abv lower than...",
    valid_input: "number"
  },
  ibu_gt: {
    type: "number",
    name: "ibu_gt",
    placeholder: "Search beers with ibu higher than...",
    valid_input: "number"
  },
  ibu_lt: {
    type: "number",
    name: "ibu_lt",
    placeholder: "Search beers with ibu lower than...",
    valid_input: "number"
  },
  ebc_gt: {
    type: "number",
    name: "ebc_gt",
    placeholder: "Search beers with ebc higher than...",
    valid_input: "number"
  },
  ebc_lt: {
    type: "number",
    name: "ebc_lt",
    placeholder: "Search beers with ebc lower than...",
    valid_input: "number"
  },
  yeast: {
    type: "text",
    name: "yeast",
    placeholder: "Search beers by yeast...",
    valid_input: "string"
  },
  hops: {
    type: "text",
    name: "hops",
    placeholder: "Search beers by hops...",
    valid_input: "string"
  },
  malt: {
    type: "text",
    name: "malt",
    placeholder: "Search beers by malt...",
    valid_input: "string"
  },
};

export const getSearchInputType = (searchType) => searchInputTypes[searchType];
