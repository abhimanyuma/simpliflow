// @flow

import React from 'react';

class HomeHero extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="jumbotron home-hero-margin">
          <h1>Simpliflow</h1>
          <p className="lead">
            Simpliflow is a platform to create simple
            easy to use workflows to automate repetitive
            beauraucratic tasks like Approvals, and Data Collection.
          </p>
        </div>
      </div>
    );
  }
}

export default HomeHero;
