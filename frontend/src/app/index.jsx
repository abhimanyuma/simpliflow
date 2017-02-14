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

import HomeHero from './components/static_components/HomeHero.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import SignupPage from './components/signup/SignupPage.jsx';

import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

const loggerMiddleware = createLogger();
const middleware = routerMiddleware(browserHistory)

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    middleware
  )
);

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/dashboard" component={Dashboard}>

      </Route>
      <Route path="/" component={Workspace}>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Route>

    </Router>
  </Provider>
  , document.getElementById('main'));
