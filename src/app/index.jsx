import React from 'react';
import {render} from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import Workspace from './components/Workspace.jsx';

import { createStore } from 'redux';
import reducer from './reducers/Reducer.js';

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

let store = createStore(reducer);

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('main'));
