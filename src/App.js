import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Browse from "./components/Browse";
import SearchResult from "./components/SearchResult";
import Basket from "./components/Basket";
import Footer from "./components/Footer";
import BeerDetails from "./components/BeerDetails";
import NoSuchBeer from "./components/NoSuchBeer";
import NotFound from "./components/NotFound";
import "./styles/App.scss"
import FilterResult from "./components/FilterResult";

function App() {

  return (
	<Router>
		<div className="App">
			<div className="container">
				<Header />
				<Switch>
					<Route exact path="/" component={Browse} />
					<Route path="/search/:query" component={SearchResult} />
					<Route path ="/filter/:filterquery" component={FilterResult} />
					<Route path="/basket" component={Basket} />
					<Route path="/beer-details/:beerId" component={BeerDetails} />
					<Route path="/beer-404" component={NoSuchBeer}/>
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</div>
		</div>
	</Router>
  );
}

export default App;
