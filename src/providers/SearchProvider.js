import React, { createContext, useState, useEffect } from "react";
import {
  fetchBeers,
  loadBeers,
  prepDataForAutoComplete,
  applyCurrency,
  sortByDate,
  sortAtoZ,
  sortZtoA,
  sortABVlowToHigh,
  sortABVhighToLow,
  filterByName,
  filterByMinPrice,
  filterByMaxPrice,
  filterByBrewDate,
  fetchBeerByBeerId,
  addPrice,
} from "./search.utils";

import {
  changeCurrencyForCountry,
  changeCurrencySignForCountry,
} from "./basket.utils";

export const SearchContext = createContext({
  dataForAutocomplete: {},
  setDataForAutoComplete: () => {},
  searchText: "",
  setSearchText: () => {},
  beerId: null,
  setBeerId: () => {},
  searchComplete: false,
  setSearchComplete: () => {},
  pageNum: 1,
  changePageNum: () => {},
  productsPerPage: 10,
  changeProductsPerPage: () => {},
  searchResults: [],
  getSearchResults: () => {},
  searchType: "",
  setSearchType: () => {},
  isSorted: "",
  setSorted: () => {},
  isFiltered: "",
  setFiltered: () => {},
  prevCurrencyCode: "GBP",
  setPrevCurrencyCode: () => {},
  currencycode: "GBP",
  setCurrencyCode: () => {},
  newCurrencySign: "£",
  setCurrencyCode: () => {},
  setCurrencySign: () => {},
});

const SearchProvider = ({ children }) => {
  const [dataForAutoComplete, setDataForAutoComplete] = useState({});
  const [searchText, setSearchText] = useState(null);
  const [beerId, setBeerId] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [productsPerPage, setproductsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);
  const [isSorted, setSorted] = useState("");
  const [isFiltered, setFiltered] = useState("");
  const [prevCurrencyCode, setPrevCurrencyCode] = useState("GBP")
  const [currencyCode, setCurrencyCode] = useState("GBP");
  const [currencySign, setCurrencySign] = useState("£");

  const getDataForAutoComplete = async () => {
    try {
      const allBeers = await loadBeers();
      const data = prepDataForAutoComplete(allBeers);
      setDataForAutoComplete(data);
    } catch (err) {}
  };

  const getSearchResults = async () => {

    let beerFromAPI = [];
    
    if (beerId) { // get just one beer from API if individual beerDetail page is first that user visits
      try {
        beerFromAPI = await fetchBeerByBeerId(beerId);
      } catch (err) {console.log(err)}
    } else {      // else fetch entire 1st batch of beers on first visit to Browse page
        try {
          beerFromAPI = await fetchBeers(
          searchText,
          searchType,
          pageNum,
          productsPerPage
      ) 
        } catch (err) {
          console.log(err)
        }  
    } 
    const beersWithPrices = addPrice(beerFromAPI)

    let beersWithCurrentCurrency = applyCurrency(
      beersWithPrices,
      prevCurrencyCode,
      currencyCode
    );

    setSearchResults(beersWithCurrentCurrency);
  };

  const loadDataForAutocomplete = () => {
    getDataForAutoComplete()
  }

  const changeSearchType = (newSearchType) => {
    setSearchType(newSearchType);
  };

  const changeSearchText = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const changePageNum = (newPageNum) => {
    setPageNum(newPageNum);
  };

  const changeProductsPerPage = (newProductsPerPageNum) => {
    setproductsPerPage(newProductsPerPageNum);
  };

  const changeCurrencyForSearch = (country) => {
    setPrevCurrencyCode(currencyCode);
    setCurrencyCode(changeCurrencyForCountry(country));
    setCurrencySign(changeCurrencySignForCountry(country));
  };

  const sortSearchResultsByDate = () => {
    setSearchResults(sortByDate(searchResults));
    setSorted("date");
  };

  const sortSearchResultsAtoZ = () => {
    setSearchResults(sortAtoZ(searchResults));
    setSorted("fromAtoZ");
  };

  const sortSearchResultsZtoA = () => {
    setSearchResults(sortZtoA(searchResults));
    setSorted("fromZtoA");
  };

  const sortSearchResultsByABVlowToHigh = () => {
    setSearchResults(sortABVlowToHigh(searchResults));
    setSorted("ABVlowToHigh");
  };

  const sortSearchResultsByABVHighToLow = () => {
    setSearchResults(sortABVhighToLow(searchResults));
    setSorted("ABVhighToLow");
  };

  const filterSearchResultsByName = (name) => {
    setSearchResults(filterByName(name, searchResults));
    setFiltered("name");
  };

  const filterSearchResultsByMinPrice = (price) => {
    setSearchResults(filterByMinPrice(price, searchResults));
    setFiltered("minprice");
  };

  const filterSearchResultsByMaxPrice = (price) => {
    setSearchResults(filterByMaxPrice(price, searchResults));
    setFiltered("maxprice");
  };

  const filterSearchResultsByBrewDate = (date) => {
    setSearchResults(filterByBrewDate(date, searchResults));
    setFiltered("brewdate");
  };

  // const getBeerFromStore = (beerId) => {
  //   let currentBeer = searchResults.find((beer) => beer.id === beerId);
  //   return currentBeer;
  // };

  // liten to state changes for API calls
  useEffect(() => {
    getSearchResults();
  }, [searchText, pageNum, productsPerPage]);

  // liten to chagnes in the currency setting
  useEffect(() => {
    
    setSearchResults(applyCurrency(searchResults, currencyCode));
  }, [currencyCode]);

  useEffect(() => {
    if (searchComplete === false) {
      setSearchText(null);
      setPageNum(1);
      setproductsPerPage(10);
    }
  }, [searchComplete]);

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        getSearchResults,
        searchText,
        dataForAutoComplete,
        searchComplete,
        setSearchComplete,
        changeSearchType,
        changeSearchText,
        changePageNum,
        changeProductsPerPage,
        changeCurrencyForSearch,
        currencySign,
        sortSearchResultsByDate,
        sortSearchResultsAtoZ,
        sortSearchResultsZtoA,
        sortSearchResultsByABVlowToHigh,
        sortSearchResultsByABVHighToLow,
        filterSearchResultsByName,
        filterSearchResultsByMinPrice,
        filterSearchResultsByMaxPrice,
        filterSearchResultsByBrewDate,
        // getBeerFromStore,
        loadDataForAutocomplete
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
