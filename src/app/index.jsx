import React from 'react';
import {render} from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import Workspace from './components/Workspace.jsx';

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/Reducer.js';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import HomeHero from './components/static_components/HomeHero.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import SignupPage from './components/signup/SignupPage.jsx';

class App extends React.Component {

  render () {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Workspace}>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Route>
      </Router>
    );
  }
}

const loggerMiddleware = createLogger();

let store = createStore(
  reducer, 
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('main'));
