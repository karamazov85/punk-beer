import { configureStore } from "@reduxjs/toolkit";
import initSubscriber from "redux-subscriber";
import searchReducer from "./search/searchSlice";
import basketReducer from "./basket/basketSlice";

export default configureStore({
    reducer: {
        search: searchReducer,
        basket: basketReducer
    }
})

