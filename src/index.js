/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

import Check from './New.js';

import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore, { history } from './store';
import Login from './layouts/Login.js'

import NotFound from './components/NotFound/NotFound'


export const { persistor, store } = configureStore();


const hist = createBrowserHistory();



const MainApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Router history={hist}>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route exact path="/" component={Login} />
              <Route exact path="*" component={NotFound} />

              {/* <Route path="/rtl" component={RTL} /> */}
              {/* <Redirect from="/" to="/admin" /> */}

            </Switch>
          </Router>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  )
}

ReactDOM.render(

  <MainApp />
  ,


  document.getElementById("root")
);

