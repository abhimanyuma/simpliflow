// @flow

import React from 'react';

class HomeHero extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="jumbotron home-hero-margin">
          <h1>Max Flo</h1>
          <p className="lead">
            Max Flo is a platform to create simple
            worflows and smart forms.
            Use them to collect information
          </p>
        </div>
      </div>
      // <section className="hero is-info is-large">
      //   <div className="hero-body">
      //     <div className="container has-text-centered">
      //       <h1 className="title">
      //         Flox: Smart Webform based Workflows
      //       </h1>
      //       <h2 className="subtitle">
      //         Making Beauracy Linear
      //       </h2>
      //     </div>
      //   </div>
      // </section>
    );
  }
}

export default HomeHero;
