
import { createSlice } from "@reduxjs/toolkit";
import { fetchBeers, addPrice, fetchAllBeers, prepDataForAutoComplete, sortAtoZ, sortZtoA, sortByDate, sortABVhighToLow, sortABVlowToHigh, filterByName, filterByMinPrice, filterByMaxPrice, filterByBrewDate, applyCurrency, getCurrencySign } from "./search.utils";

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
        dataForAutoComplete: {},
        searchComplete: false,
        currencyCode: "GBP",
        currencySign: "£",
    },
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload
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

export const { setSearchParams, setSearchResult, setDataForAutoComplete, setSearchComplete, sortSearchResultAtoZ, sortSearchResultZtoA, sortSearchResultByDate, sortByAbvHighToLow, sortByAbvLowToHigh, filterSearchResultByName, filterSearchResultByMinPrice, filterSearchResultByMaxPrice, filterSearchResultByBrewDate, setPricesInNewCurrencyInSearch, setNewCurrencySignInSearch, setNewCurrencyCodeInSearch} = slice.actions;

// THUNKS
export const fetchBeersOnInit = () => async dispatch => {
    const searchParamsForAppInitAPICall = { 
            searchText: "",
            searchType: "beer_name",
            pageNum: 1,
            productsPerPage: 10, 
        }
    const { searchText, searchType, pageNum, productsPerPage } = searchParamsForAppInitAPICall;
    try {
        const beersFromAPI = await fetchBeers(searchText, searchType, pageNum, productsPerPage);
        const beersWithPrices = addPrice(beersFromAPI);
        dispatch(setSearchResult(beersWithPrices));
    } catch (err) {
        console.log(err)
    }
}

export const fetchBeersAsync = searchParams => async (dispatch, getState) => {
    dispatch(setSearchParams(searchParams))
    const { searchText, searchType, pageNum, productsPerPage } = searchParams;
    try {
        const beersFromAPI = await fetchBeers(searchText, searchType, pageNum, productsPerPage);
        const beersWithPrices = addPrice(beersFromAPI);
        // check if currencyCode has changed, apply local currency
        const currencyCode = getState().search.currencyCode; 
        const beersInCurrentCurrency = applyCurrency(beersWithPrices, currencyCode);
        dispatch(setSearchResult(beersInCurrentCurrency));
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












// const INITIAL_STATE = {
//     searchResults: [],
//     searchParams: { 
//         searchText: "",
//         searchType: "",
//         pageNum: 1,
//         productsPerPage: 10 
//     }
// }

// const searchReducer = (state = INITIAL_STATE, action) => {
//     debugger;
//     switch(action.type) {
//         case "SET_SEARCH_RESULTS":
//             return {...state,
//                     searchResults: [...state.searchResults, ...action.payload]
//             }
//         default:
//             return state;
//     }
// }

// export default searchReducer;