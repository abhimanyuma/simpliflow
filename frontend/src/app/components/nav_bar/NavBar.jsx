// @flow

import React from 'react';

import Logo from './Logo.jsx';
import LoginInfoContainer from './LoginInfoContainer.jsx';
import Links from './Links.jsx';

class NavBar extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Logo show_logo={this.props.show_logo}/>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <Links />
          <LoginInfoContainer />
        </div>
      </nav>

      // <nav className="nav has-shadow">
      //   <Logo show_logo={this.props.show_logo}/>
      //   <Links />
      //   <LoginInfoContainer show_login={this.props.show_login}/>
      // </nav>

    );
  }
}

export default NavBar;
