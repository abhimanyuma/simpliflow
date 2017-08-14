// @flow

import React from 'react';

import NavBar from './nav_bar/NavBar.jsx';
import Footer from './footer/Footer.jsx';
import HomeHero from './static_components/HomeHero.jsx';


class Workspace extends React.Component {
  render () {
    return (
      <div className="full-width-container">
        <NavBar show_logo={true} show_login={true} show_links={true} />
        <div className="full-page-container container">
          <div className="workspace-container">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Workspace;
