import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from "./redux/store";
import { Provider } from "react-redux";
import App from './App';
import { fetchBeersOnInit } from "./redux/search/searchSlice";

store.dispatch(fetchBeersOnInit());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


