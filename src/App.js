import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Browse from "./components/Browse";
import SearchResult from "./components/SearchResults";
import Basket from "./components/Basket";
import Footer from "./components/Footer";
import BeerDetails from "./components/BeerDetails";
import "./styles/App.scss"

function App() {

  return (
	<Router>
		<div className="App">
			<div className="container">
				<Header />
				<Switch>
					<Route exact path="/" component={Landing} /> 
					<Route exact path="/browse" component={Browse} />
					<Route path={"/beers/:query"} component={SearchResult} />
					<Route path="/basket" component={Basket} />
					<Route path={"/beer-details/:beerId"} component={BeerDetails} />
				</Switch>
				<Footer />
			</div>
		</div>
	</Router>
  );
}

export default App;
