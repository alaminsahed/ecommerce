import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import Productd from "./components/Productd/Productd";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { AuthContextProvider,PrivateRoute } from "./components/Login/useAuth";
import Ship from "./components/Ship/Ship";

function App(props) {
  // const user = { name: "kadu", email: "k@gmail.com" };
  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>
            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/product/:productKey">
              <Productd></Productd>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/ship">
             <Ship></Ship>
            </PrivateRoute>

            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
