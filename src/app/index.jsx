import React from 'react';
import {render} from 'react-dom';

import Hello from './components/Hello.jsx'

class App extends React.Component {
  render () {
    return <Hello compiler="Babel" framework="React"/>;
  }
}

render(<App/>, document.getElementById('main'));
