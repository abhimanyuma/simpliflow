import React from 'react';

import Logo from './Logo.jsx';
import LoginInfo from './LoginInfo.jsx';
import Links from './Links.jsx';

class NavBar extends React.Component {
  render () {
    return (
      <div className="nav-bar">
        <Logo />
        <Links />
        <LoginInfo />
      </div>
    );
  }
}

export default NavBar;
