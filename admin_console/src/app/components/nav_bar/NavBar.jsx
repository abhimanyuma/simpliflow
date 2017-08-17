// @flow

import React from 'react';

import Logo from './Logo.jsx';
import LoginInfoContainer from './LoginInfoContainer.jsx';
import Links from './Links.jsx';

class NavBar extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="main-navbar">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Logo show_logo={this.props.show_logo}/>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {this.props.show_links && <Links />}
          <LoginInfoContainer show_login={this.props.show_login} />
        </div>
      </nav>
    );
  }
}

export default NavBar;
