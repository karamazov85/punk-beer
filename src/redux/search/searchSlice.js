
import { createSlice } from "@reduxjs/toolkit";
import { fetchBeers, addPrice, fetchAllBeers, prepDataForAutoComplete, sortAtoZ, sortZtoA, sortByDate, sortABVhighToLow, sortABVlowToHigh, filter, applyCurrency, getCurrencySign } from "./search.utils";

export const slice = createSlice({
    name: "search", 
    initialState: {
        searchResult: [],
        filteredResult: [],
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
        filterResults: (state, action) => {
            const filtered = filter(state.searchResult, action.payload);
            state.filteredResult = filtered; 
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

export const { setSearchParams, setIsFetchingTrue, setIsFetchingFalse, setSearchResult, setDataForAutoComplete, setSearchComplete, sortSearchResultAtoZ, sortSearchResultZtoA, sortSearchResultByDate, sortByAbvHighToLow, sortByAbvLowToHigh, filterResults, setPricesInNewCurrencyInSearch, setNewCurrencySignInSearch, setNewCurrencyCodeInSearch} = slice.actions;

// THUNKS
export const fetchBeersAsync = queryString => async (dispatch, getState) => {
    // URL has changed
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
    } catch (error) {
        console.log(error)
    }
}

export const fetchDataForAutoComplete = () => async dispatch => {
    try {
      const allBeers = await fetchAllBeers();
      const data = prepDataForAutoComplete(allBeers);
      dispatch(setDataForAutoComplete(data));
    } catch (error) {
        console.log(error)
    }
  };

export const fetchFullStock = () => async (dispatch, getState) => { 
    try {
        dispatch(setIsFetchingTrue());
        const beersFromAPI = await fetchAllBeers();
        const beersWithPrices = addPrice(beersFromAPI);

        // check if currencyCode has changed in the store, apply local currency
        const currencyCode = getState().search.currencyCode; 
        const beersInCurrentCurrency = applyCurrency(beersWithPrices, currencyCode);
        dispatch(setSearchResult(beersInCurrentCurrency));
        dispatch(setIsFetchingFalse());
    } catch (error) {
        console.log(error)
    }
}

export default slice.reducer;