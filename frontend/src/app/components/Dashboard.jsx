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
        <NavBar show_logo={true} show_login={true} />
        <div className="container-fluid">
          <div className="row">
            <SideBar />
            <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
              <DashboardHome />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
