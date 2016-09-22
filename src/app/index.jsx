import React from 'react';
import {render} from 'react-dom';

import Home from './components/Home.jsx'

class App extends React.Component {
  render () {
    return(
      <Home compiler="Babel" framework="React"/>
    );
  }
}

render(<App/>, document.getElementById('main'));
