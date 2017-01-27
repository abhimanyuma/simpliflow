// @flow

import React from 'react';

class HomeHero extends React.Component {
  render () {
    return (
      <div>
      <div className="inner cover">
        <h1 className="cover-heading">MaxFlo</h1>
        <p className="lead">
          Create Smart Webform to simply automate business workflows
        </p>
        <p className="lead">
          <a href="#" classMame="btn btn-lg btn-secondary">Learn more</a>
        </p>
      </div>

       <div className="mastfoot">
          <div className="inner">
            <p>Cover template for <a href="https://getbootstrap.com">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
          </div>
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
