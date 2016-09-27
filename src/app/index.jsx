import React from 'react';
import {render} from 'react-dom';
import Backbone from 'backbone';

import { Router, Route, hashHistory } from 'react-router'
import Store from './store/BasicStore.js';
import AppDispatcher from './dispatcher/AppDispatcher.js';


import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';



class App extends React.Component {
  constructor() {
    super();
    window.Dispatcher = new AppDispatcher();
    window.Store = new Store();
  }

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
