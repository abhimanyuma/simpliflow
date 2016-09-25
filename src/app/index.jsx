import React from 'react';
import {render} from 'react-dom';
import Backbone from 'backbone';

import Router from 'react-router';
import Store from './store/BasicStore.js';
import AppDispatcher from './dispatcher/AppDispatcher.js';


import Home from './components/Home.jsx'



class App extends React.Component {
  constructor() {
    super();
    window.Dispatcher = new AppDispatcher();
    window.Store = new Store();
  }

  render () {

    return(
      <div className="main-container">
        <Home compiler="Babel" framework="React"/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('main'));
