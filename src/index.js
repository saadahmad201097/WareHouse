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
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

// core components
import Admin from 'layouts/Admin.js';
import RTL from 'layouts/RTL.js';

import 'assets/css/material-dashboard-react.css?v=1.8.0';

import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import axios from 'axios';
import cookie from 'react-cookies';
import Check from './New';
import Login from './layouts/Login';
import configureStore, { history } from './store';

import NotFound from './components/NotFound/NotFound';

export const { persistor, store } = configureStore();

const hist = createBrowserHistory();
function SecuredRoute(props) {
  const { component: Component, path } = props;
  return (
    <Router history={hist}>
      <Route
        path={path}
        render={() => {
          // document.cookie = 'loggedInUser=';

          // console.log(document.cookie.split('=')[1]);
          const token = cookie.load('token') || '';

          if (token) {
            return <Component />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </Router>
  );
}

function interceptor() {
  console.log('interdd');
  axios.interceptors.request.use(
    function(config) {
      console.log('requset interceptor');
      const token = cookie.load('token') || '';
      console.log('token: ', token);
      // Do something before request is sent
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      console.log('error: ', error.response.data);
      return error;
    }
  );
}

const MainApp = () => {
  interceptor();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Router history={hist}>
            {/* <Switch>
              <Route path="/admin" component={Admin}></Route>
              <Route exact path="/" component={Login} />
              <Route exact path="*" component={NotFound} />
            </Switch> */}

            {/* <SecuredRoute path="/admin" component={Admin} /> */}
            {/* <SecuredRoute exact path="/login" component={Login} /> */}
            <SecuredRoute path="/admin" component={Admin} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            {/* <Route path="*" component={NotFound} /> */}

            {/* <SecuredRoute path="/" component={Login} /> */}
          </Router>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<MainApp />, document.getElementById('root'));

/* <Route path="/rtl" component={RTL} /> */

/* <Redirect from="/" to="/admin" /> */
