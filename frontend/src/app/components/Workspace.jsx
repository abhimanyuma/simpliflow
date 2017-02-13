// @flow

import React from 'react';

import NavBar from '../components/nav_bar/NavBar.jsx';
import Footer from '../components/footer/Footer.jsx';
import HomeHero from '../components/static_components/HomeHero.jsx';


class Workspace extends React.Component {
  render () {
    return (
      <div className="full-width-container">
        <NavBar show_logo={true} show_login={true} />
        <div className="full-page-container container">
          <div className="workspace-container">
            {this.props.children || <HomeHero />}
          </div>
        </div>
        <Footer />
      </div>
      // <div>
      //   <div className="columns is-gapless is-multiline">
      //     <div className="column is-12">
      //       <NavBar show_logo={true} show_login={true} />
      //     </div>
      //     <div className="column is-12">
      //       {this.props.children || <HomeHero />}
      //     </div>
      //     <div className="column is-12">
      //       <Footer wide={true} />
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Workspace;
