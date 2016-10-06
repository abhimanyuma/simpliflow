import React from 'react';

import NavBar from '../components/nav_bar/NavBar.jsx';
import HomeHero from '../components/static_components/HomeHero.jsx';
import Footer from '../components/footer/Footer.jsx';
import GlobalModel from '../models/Model.js';


class Home extends React.Component {
  render () {
    return (
      <div className="home-container">
        <NavBar show_logo={true} show_login={true} />
        <HomeHero/>
        <h2>{GlobalModel.rand}</h2>
        <Footer wide={true} />
      </div>
    );
  }
}

export default Home;
