
import { createSlice } from "@reduxjs/toolkit";
import { fetchBeers, fetchBeerByBeerId, getSearchParamsFromSlug, getSearchParamsFromQueryStr, addPrice, fetchAllBeers, prepDataForAutoComplete, sortAtoZ, sortZtoA, sortByDate, sortABVhighToLow, sortABVlowToHigh, filterByName, filterByMinPrice, filterByMaxPrice, filterByBrewDate, applyCurrency, getCurrencySign } from "./search.utils";

export const slice = createSlice({
    name: "search", 
    initialState: {
        searchResult: [],
        searchParams: { 
            searchText: "",
            searchType: "beer_name",
            pageNum: 1,
            productsPerPage: 10, 
        },
        isFetching: false,
        dataForAutoComplete: {},
        currencyCode: "GBP",
        currencySign: "£",
    },
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload
        },
        setIsFetchingTrue: state => {
            state.isFetching = true;
        },
        setIsFetchingFalse: state => {
            state.isFetching = false;
        },
        setSearchResult: (state, action) => {
            state.searchResult = action.payload;
        },
        setDataForAutoComplete: (state, action) => {
            state.dataForAutoComplete = action.payload;
        },
        setSearchComplete: (state, action) => {
            state.searchComplete = action.payload;
        },
        sortSearchResultAtoZ: state => {
            const sorted = sortAtoZ(state.searchResult);
            state.searchResult = sorted;
        },
        sortSearchResultZtoA: state => {
            const sorted = sortZtoA(state.searchResult);
            state.searchResult = sorted;
        },
        sortSearchResultByDate: state => {
            const sorted = sortByDate(state.searchResult);
            state.searchResult = sorted; 
        },
        sortByAbvHighToLow: state => {
            const sorted = sortABVhighToLow(state.searchResult);
            state.searchResult = sorted; 
        },
        sortByAbvLowToHigh: state => {
            const sorted = sortABVlowToHigh(state.searchResult);
            state.searchResult = sorted; 
        },
        filterSearchResultByName: (state, action) => {
            const filtered = filterByName(state.searchResult, action.payload);
            state.searchResult = filtered; 
        },
        filterSearchResultByMinPrice: (state, action) => {
            const filtered = filterByMinPrice(state.searchResult, action.payload);
            state.searchResult = filtered;
        },
        filterSearchResultByMaxPrice: (state, action) => {
            const filtered = filterByMaxPrice(state.searchResult, action.payload);
            state.searchResult = filtered;
        },
        filterSearchResultByBrewDate: (state, action) => {
            const filtered = filterByBrewDate(state.searchResult, action.payload);
            state.searchResult = filtered;
        },
        setPricesInNewCurrencyInSearch: (state, action) => {
            const beersInNewCurrency = applyCurrency(state.searchResult, action.payload);
            state.searchResult = beersInNewCurrency;
        },
        setNewCurrencySignInSearch: (state, action) => {
            const newCurrencySign = getCurrencySign(action.payload); 
            state.currencySign = newCurrencySign;
        },
        setNewCurrencyCodeInSearch: (state, action) => {
            const newCurrencyCode = action.payload;
            state.currencyCode = newCurrencyCode;
        }
    }
});     

export const { setSearchParams, setIsFetchingTrue, setIsFetchingFalse, setSearchResult, setDataForAutoComplete, setSearchComplete, sortSearchResultAtoZ, sortSearchResultZtoA, sortSearchResultByDate, sortByAbvHighToLow, sortByAbvLowToHigh, filterSearchResultByName, filterSearchResultByMinPrice, filterSearchResultByMaxPrice, filterSearchResultByBrewDate, setPricesInNewCurrencyInSearch, setNewCurrencySignInSearch, setNewCurrencyCodeInSearch} = slice.actions;

// THUNKS
// export const fetchOnInit = queryString => async (dispatch, getState) => {
//     try {
//         dispatch(setIsFetchingTrue());
//         const beersFromAPI = await fetchBeers(queryString);
//         const beersWithPrices = addPrice(beersFromAPI);
//         const currencyCode = getState().search.currencyCode; 
//         const beersInCurrentCurrency = applyCurrency(beersWithPrices, currencyCode);
//         dispatch(setSearchResult(beersInCurrentCurrency));
//         dispatch(setIsFetchingFalse());
//     } catch (err) {
//         console.log(err)   
//     }
// }

export const fetchBeersAsync = queryString => async (dispatch, getState) => {
    debugger
    // URL has changed. Set the search params accordingly in reducer
    // const newSearchParams = getSearchParamsFromSlug(slug)
    const newSearchParamsFromQuery = getSearchParamsFromQueryStr(queryString)
    console.log(newSearchParamsFromQuery)
    // dispatch(setSearchParams(newSearchParams));
    // const { searchText, searchType, pageNum, productsPerPage } = newSearchParams;
    try {
        // fetch beer(s) based on updated search params
        dispatch(setIsFetchingTrue());
        const beersFromAPI = await fetchBeers(queryString);
        const beersWithPrices = addPrice(beersFromAPI);

        // check if currencyCode has changed in the store, apply local currency
        const currencyCode = getState().search.currencyCode; 
        const beersInCurrentCurrency = applyCurrency(beersWithPrices, currencyCode);
        dispatch(setSearchResult(beersInCurrentCurrency));
        dispatch(setIsFetchingFalse());
    } catch (err) {
        console.log(err)
    }
}

export const fetchBeerByIdAsync = beerId => async dispatch => {
    try {   
      dispatch(setIsFetchingTrue());
      const beerFromAPI = await fetchBeerByBeerId(beerId);
      console.log(beerFromAPI)
      
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataForAutoComplete = () => async dispatch => {
    try {
      const allBeers = await fetchAllBeers();
      const data = prepDataForAutoComplete(allBeers);
      dispatch(setDataForAutoComplete(data));
    } catch (err) {
        console.log(err)
    }
  };

export default slice.reducer;