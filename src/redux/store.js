import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search/searchSlice";
import basketReducer from "./basket/basketSlice";
import { loadState } from "./localStorage";

const preloadedState = loadState();

export default configureStore({
    preloadedState,
    reducer: {
        search: searchReducer,
        basket: basketReducer
    }
})

