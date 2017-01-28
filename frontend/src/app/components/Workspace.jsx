// @flow

import React from 'react';

import NavBar from '../components/nav_bar/NavBar.jsx';
import Footer from '../components/footer/Footer.jsx';
import HomeHero from '../components/static_components/HomeHero.jsx';


class Workspace extends React.Component {
  render () {
    return (
      <div>
        <NavBar show_logo={true} show_login={true} />
        {this.props.children || <HomeHero />}
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
