import React from 'react';

import NavBar from '../components/nav_bar/NavBar.jsx';
import LoginFull from '../components/login/LoginFull.jsx';
import Footer from '../components/footer/Footer.jsx';


class Login extends React.Component {
  render () {
    return (
      <div className="home-container">
        <NavBar show_logo={true} show_login={true} />
        <LoginFull/>
        <Footer wide={true} />
      </div>
    );
  }
}

export default Login;
