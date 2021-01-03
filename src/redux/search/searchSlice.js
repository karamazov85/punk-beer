
import { createSlice } from "@reduxjs/toolkit";
import { fetchBeers, addPrice, fetchAllBeers, prepDataForAutoComplete } from "./search.utils";

export const slice = createSlice({
    name: "search", 
    initialState: {
        searchResult: {},
        searchParams: { 
            searchText: "",
            searchType: "beer_name",
            pageNum: 1,
            productsPerPage: 10, 
        },
        dataForAutoComplete: {},
        searchComplete: false,
    },
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload
        },
        setSearchResult: (state, action) => {
            const newSearchResult = {};
            action.payload.forEach(beer => {newSearchResult[beer.id] = beer});
            state.searchResult = newSearchResult;
        },
        setDataForAutoComplete: (state, action) => {
            state.dataForAutoComplete = action.payload;
        },
        setSearchComplete: (state, action) => {
            state.searchComplete = action.payload;
        } 
        
    },
})     

export const { setSearchParams, setSearchResult, setDataForAutoComplete, setSearchComplete } = slice.actions;


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

export const fetchBeersAsync = searchParams => async dispatch => {
    dispatch(setSearchParams(searchParams))
    const { searchText, searchType, pageNum, productsPerPage } = searchParams;
    try {
        const beersFromAPI = await fetchBeers(searchText, searchType, pageNum, productsPerPage);
        const beersWithPrices = addPrice(beersFromAPI);
        dispatch(setSearchResult(beersWithPrices));
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