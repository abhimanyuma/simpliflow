/* @flow */
import React from 'react';
import {render} from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Bootstrap from 'bootstrap/dist/js/bootstrap.js';

import Workspace from './components/Workspace.jsx';
import Dashboard from './components/Dashboard.jsx';

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/Reducer.js';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { requireAuth } from './common/authentication.js';

import { UserAuthWrapper } from 'redux-auth-wrapper'

import HomeHero from './components/static_components/HomeHero.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import SignupPage from './components/signup/SignupPage.jsx';

import { syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'

const loggerMiddleware = createLogger();
const routingMiddleware = routerMiddleware(browserHistory)

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    routingMiddleware
  )
);

const history = syncHistoryWithStore(browserHistory, store)

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.profile, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirectAction
  LoadingComponent: Workspace,
  authenticatingSelector: state => {
    return ((!state.profile.get) || (!state.profile.get("loading")))
  },
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  predicate: profile => {return(profile.get && profile.get('auth_token'))}
})


render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)}>

      </Route>
      <Route path="/" component={Workspace}>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Route>

    </Router>
  </Provider>
  , document.getElementById('main'));
