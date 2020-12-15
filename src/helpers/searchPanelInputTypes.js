export const searchInputTypes = {
  beer_name: {
    type: "search",
    name: "name",
    placeholder: "Search the catalogue by beer name...",
  },
  abv_gt: {
    type: "number",
    name: "abv_gt",
    placeholder: "Search beers with abv higher than...",
  },
  abv_lt: {
    type: "number",
    name: "abv_lt",
    placeholder: "Search beers with abv lower than...",
  },
  ibu_gt: {
    type: "number",
    name: "ibu_gt",
    placeholder: "Search beers with ibu higher than...",
  },
  ibu_lt: {
    type: "number",
    name: "ibu_lt",
    placeholder: "Search beers with ibu lower than...",
  },
  ebc_gt: {
    type: "number",
    name: "ebc_gt",
    placeholder: "Search beers with ebc higher than...",
  },
  ebc_lt: {
    type: "number",
    name: "ebc_lt",
    placeholder: "Search beers with ebc lower than...",
  },
  yeast: {
    type: "search",
    name: "yeast",
    placeholder: "Search beers by yeast...",
  },
  hops: {
    type: "search",
    name: "hops",
    placeholder: "Search beers by hops...",
  },
  malt: {
    type: "search",
    name: "malt",
    placeholder: "Search beers by malt...",
  },
};

export const getSearchInputType = (searchType) => searchInputTypes[searchType];
