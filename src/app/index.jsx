import React from 'react';
import {render} from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store/Store.js';

import Workspace from './components/Workspace.jsx';


import HomeHero from './components/static_components/HomeHero.jsx';
import LoginFull from './components/login/LoginFull.jsx';

class App extends React.Component {

  render () {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Workspace}>
          <Route path="/login" component={LoginFull} />
        </Route>
      </Router>
    );
  }
}

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('main'));
