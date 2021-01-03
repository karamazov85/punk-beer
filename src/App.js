import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Browse from "./components/Browse";
import Basket from "./components/Basket";
import Footer from "./components/Footer";
import BeerDetails from "./components/BeerDetails";
import BasketProvider from "./providers/BasketProvider";
import SearchProvider from "./providers/SearchProvider";


import "./styles/App.scss"

function App() {

  return (
      
      	<BasketProvider>
      	 
      	    <Router>
      	      <div className="App">
      	        <div className="container">
      	          <Header />
      	          <Switch>
      	            <Route exact path="/" component={Browse} />
      	            <Route path="/basket" component={Basket} />
      	            <Route path={"/:beerId"} component={BeerDetails} />
      	          </Switch>
      	          <Footer />
      	        </div>
      	      </div>
      	    </Router>
      	
      	</BasketProvider>

  );
}

export default App;
