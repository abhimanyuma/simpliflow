import React from 'react';

import NavBar from './nav_bar/NavBar.jsx'


class Home extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        <h1>Totally from {this.props.compiler} and {this.props.framework}!</h1>
      </div>
    );
  }
}

export default Home;
