import React from 'react';

import Logo from './Logo.jsx';
import LoginInfo from './LoginInfo.jsx';
import Links from './Links.jsx';

class NavBar extends React.Component {
  render () {
    return (
      <div className="nav-bar">
        <Logo show_logo={this.props.show_logo}/>
        <Links />
        <LoginInfo show_login={this.props.show_login}/>
      </div>
    );
  }
}

export default NavBar;
