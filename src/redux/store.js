import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search/searchSlice";

export default configureStore({
    reducer: {
        search: searchReducer
    }
})