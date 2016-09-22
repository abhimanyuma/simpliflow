import React from 'react';
import {render} from 'react-dom';

import Home from './components/Home.jsx'

class App extends React.Component {
  render () {
    return(
      <div className="main-container">
        <Home compiler="Babel" framework="React"/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('main'));
