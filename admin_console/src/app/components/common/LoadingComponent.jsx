// @flow

import React from 'react';

import NavBar from '../nav_bar/NavBar.jsx';
import Footer from '../footer/Footer.jsx';


class Workspace extends React.Component {
  render () {
    return (
      <div className="full-width-container">
        <NavBar show_logo={false} show_login={false} show_links={false}/>
        <div className="full-page-container container">
          <div className="card">
            <h3 className="card-header">
              Loading
            </h3>
            <div className="card-block">
              <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated loading-bar-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" ></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Workspace;
