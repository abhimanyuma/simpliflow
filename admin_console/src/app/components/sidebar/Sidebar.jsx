import React from 'react';
import { Link } from 'react-router';


class SideBar extends React.Component {

  render () {
    return(
      <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">Overview <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <Link to="/dashboard/forms" className="nav-link">Forms</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Dashboards</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Data</a>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <Link to="/dashboard/organisations" className="nav-link">Organisations</Link>
            <Link to="/dashboard/teams" className="nav-link">Teams</Link>
          </li>
        </ul>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <Link to="/dashboard/profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link" >Settings</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default SideBar