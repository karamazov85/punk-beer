import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from "./redux/store";
import { saveState } from "./redux/localStorage";
import { Provider } from "react-redux";
import App from './App';

// local storage 
store.subscribe(() => {
  saveState({
    basket: store.getState().basket,
    // search: store.getState().search
  })
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


