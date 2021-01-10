import { convertShortDateToISO } from "../../helpers/dateconverter";
import { currencyConverter } from "../../helpers/currencyconverter";

export async function fetchBeers(
  searchText,
  searchType,
  pageNum,
  productsPerPage,
) {

  let endpoint = "";

  if (!searchText || !searchType) {
    endpoint = `https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=${productsPerPage}`;
  } else {
    endpoint = `https://api.punkapi.com/v2/beers?${searchType}=${searchText}&page=${pageNum}&per_page=${productsPerPage}`;
  }
  const res = await fetch(endpoint);
  const beers = await res.json();
  return beers;
}

export async function fetchBeerByBeerId(beerId) {
  debugger
  if (!beerId) {
    return;
  }
  const res = await fetch(`https://api.punkapi.com/v2/beers/${beerId}`);
  const beer = await res.json();
  return beer[0];
}

export async function fetchAllBeers() {
  const beerRequests = new Array(5)
    .fill(null)
    .map((_, i) =>
      fetch(`https://api.punkapi.com/v2/beers?page=${i + 1}&per_page=80`)
    );

  const beerResponses = await Promise.all(beerRequests).catch((err) =>
    console.log(err)
  );
  const parsedBeers = await parseBeerResponses(beerResponses); // here, we get an array of 5 arrays inside

  return parsedBeers.reduce((acc, curr) => acc.concat(curr), []);
}

function parseBeerResponses(beerResponses) {
  return Promise.all(beerResponses.map((res) => res.json())).catch((err) =>
    console.log(err)
  );
}

export function prepDataForAutoComplete(allBeers) {
  
  const beer_name_bulk = [];
  const yeast_bulk = [];
  const malt_3d = [];
  const hops_3d = [];

  allBeers.forEach((beer) => {
    beer_name_bulk.push(beer.name);
    yeast_bulk.push(beer.ingredients.yeast);
    malt_3d.push(beer.ingredients.malt);
    hops_3d.push(beer.ingredients.hops);
  });

  // flatten nested arrays into 1-dimansional arrays
  let malt_flat = malt_3d.reduce((acc, curr) => acc.concat(curr), []);

  let hops_flat = hops_3d.reduce((acc, curr) => acc.concat(curr), []);

  // get the names out of them
  const malt_bulk = malt_flat.map((malt) => malt.name);

  const hops_bulk = hops_flat.map((hops) => hops.name);

  // remove duplicates from each array then sort alphabetically
  const name = beer_name_bulk
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    )
    .sort();

  const yeast = yeast_bulk
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    )
    .sort();

  const hops = hops_bulk
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    )
    .sort();

  const malt = malt_bulk
    .reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    )
    .sort();

  return {
    name,
    yeast,
    hops,
    malt,
  };
}

export const getSearchParamsFromSlug = (slug) => {
  let params = slug.split("-"); 

  // if we have a full slug set by an actual search
  if (params.length === 4) {
      return {
      searchText: params[1],
      searchType: params[0],
      pageNum: params[2],
      productsPerPage: params[3], 
    }
  } 
  // we only cliked a pagination button on the Browse page, no searchType or searchText in slug
  if (params.length === 2) {
    return {
      searchText: "",
      searchType: "beer_name",
      pageNum: params[0],
      productsPerPage: params[1],
    }
  }
}

export const updateSlugWithNewPaginationParams = (slug, paginationParams) => {
  
  const { pageNum, productsPerPage } = paginationParams;
  
  if (!slug || slug === undefined) {
    return `${pageNum}-${productsPerPage}`
  }

  let oldParams = getSearchParamsFromSlug(slug);
  const { searchText, searchType } = oldParams;
  const newSlug = `${searchType}-${searchText}-${pageNum}-${productsPerPage}`

  return newSlug;
}

export const addPrice = beers => {
  
  if(Array.isArray(beers)) {
    const beersWithPrices = beers.map((beer) => {
      beer.price = 4.5;
      beer.price_GBP = 4.5;
      return beer; 
    })
    return beersWithPrices

  } else {
    beers.price = 4.5;
    beers.price_GBP = 4.5
    return beers;
  }
}

export const sortByDate = (searchResult) => {

  const beersWithDatesFormatted = searchResult.map((beer) => {
    const date = beer.first_brewed.split("/").map(el => parseFloat(el));
    console.log(date)
    beer.formattedDate = new Date(date[1], date[0] - 1, 1); // new Date ( year, month, day ) NOTE: month is 0 indexed so if you want it to be September then you have to give it as 9 - 1. Subtract 1 from the original number of the month.
    console.log(beer.formattedDate)
    return beer;
  });
  const sorted = beersWithDatesFormatted.sort(
    (beerA, beerB) => beerB.formattedDate - beerA.formattedDate
  );
  return sorted;
};

export const sortAtoZ = (searchResult) => {
  
  const sorted = searchResult.sort((beerA, beerB) => {
    return beerA.name.localeCompare(beerB.name, "en", {
      ignorePunctuation: true,
    });
  }); 

  return sorted;
};

export const sortZtoA = (searchResult) => {
  
  const sorted = searchResult.sort((beerA, beerB) => {
    return beerB.name.localeCompare(beerA.name, "en", {
      ignorePunctuation: true,
    });
  });

  return sorted;
};

export const sortABVlowToHigh = (searchResult) => {

  const sorted = searchResult.sort(
    (beerA, beerB) => beerA.abv - beerB.abv
  );

  return sorted;
};

export const sortABVhighToLow = (searchResult) => {

  const sorted = searchResult.sort(
    (beerA, beerB) => beerB.abv - beerA.abv
  );

  return sorted;
};

export const filterByName = (searchResult, name) => {
  const regex = new RegExp(`^${name}`, "ig");
  return searchResult.filter((beer) => beer.name.match(regex));
};

export const filterByMinPrice = (searchResult, price) => {
  return searchResult.filter((beer) => beer.price >= price);
};

export const filterByMaxPrice = (searchResult, price) => {
  return searchResult.filter((beer) => beer.price <= price);
};

export const filterByBrewDate = (searchResult, date) => {
  const selectedDateUTC = new Date(date);

  const beerWithFormattedDates = searchResult.map((beer) => {
    const brewDateISO = convertShortDateToISO(beer.first_brewed);
    const brewDateUTC = new Date(brewDateISO);
    beer.first_brewed_UTC = brewDateUTC;
    return beer;
  });

  return beerWithFormattedDates.filter(
    (beer) => beer.first_brewed_UTC >= selectedDateUTC
  );
};

export const applyCurrency = (withPrice, currencyCode) => {
  
  if(Array.isArray(withPrice)) {
      let withCurrentCurrency = withPrice.map((beer) => {
      beer.price = currencyConverter(beer.price_GBP, currencyCode)
      return beer;
    });
    return withCurrentCurrency;

  } else {
    withPrice.price = currencyConverter(withPrice.price_GBP, currencyCode)
    return withPrice;
  }
};

export const getCurrencySign = (currencyCode) => {
  switch (currencyCode) {
    case "GBP":
      return "£";
      break;
    case "USD":
      return "$";
      break;
    case "EUR":
      return "€";
      break;
    default:
      return "£";
      break;
  }
}

export const getSelectedBeerDetails = (beer) => {

  const {
    id,
    name,
    image_url,
    abv,
    ibu,
    price,
    tagline,
    description,
    target_og,
  } = beer;
  
  const yeast = beer.ingredients.yeast;
  const malt = beer.ingredients.malt.map((malt) => malt.name);
  const hops = beer.ingredients.hops.map((hops) => hops.name);

  return {
    id,
    name,
    image_url,
    abv,
    ibu,
    target_og,
    yeast,
    malt,
    hops,
    price,
    tagline,
    description,
  };
};
