//@flow

import React from 'react';
import { Link } from 'react-router';

class Links extends React.Component {
  render () {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/dashboard" className="nav-link" >Dashboard <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
    );
  }
}

export default Links;
