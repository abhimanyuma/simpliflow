import React from 'react';

import NavBar from './nav_bar/NavBar.jsx';
import HomeHero from './static_components/HomeHero.jsx';
import Footer from './footer/Footer.jsx';


class Home extends React.Component {
  render () {
    return (
      <div className="home-container">
        <NavBar show_logo={true} show_login={true} />
        <HomeHero/>
        <Footer wide={true} />
      </div>
    );
  }
}

export default Home;
