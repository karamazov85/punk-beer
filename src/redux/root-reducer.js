import { combineReducers } from "redux";

import searchReducer from "./search/search.reducer";

export default combineReducers({
    search: searchReducer
})