import React from 'react';
import {render} from 'react-dom';

import { Router, Route, hashHistory } from 'react-router'

import store from './store/Store.js';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

class App extends React.Component {

  render () {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
      </Router>
    );
  }
}

render(<App/>, document.getElementById('main'));
