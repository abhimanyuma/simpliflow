import React from 'react';

import Logo from './Logo.jsx';
import LoginInfoContainer from './LoginInfoContainer.jsx';
import Links from './Links.jsx';

class NavBar extends React.Component {
  render () {
    return (
      <nav className="nav has-shadow">
        <Logo show_logo={this.props.show_logo}/>
        <Links />
        <LoginInfoContainer show_login={this.props.show_login}/>
      </nav>
    );
  }
}

export default NavBar;
