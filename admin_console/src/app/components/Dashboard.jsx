// @flow

import React from 'react';

import NavBar from './nav_bar/NavBar.jsx';
import Footer from './footer/Footer.jsx';
import HomeHero from './static_components/HomeHero.jsx';
import SideBar from './sidebar/Sidebar.jsx';
import DashboardHome from './dashboard/DashboardHome.jsx';

class Dashboard extends React.Component {
  render () {
    return (
      <div className="full-width-container">
        <NavBar show_logo={true} show_login={true} show_links={true}/>
        <div className="container-fluid">
          <div className="row">
            <SideBar />
            <main className="col-9">
              {this.props.children}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
