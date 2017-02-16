// @flow

import React from 'react';
import { Link } from 'react-router';

class Profile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <div className="col-lg-6 col-md-9 col-sm-12">
          <div className="card ">
            <div className="card-block">
              <h4 className="card-title">{this.props.profile.get("name") || "User"}</h4>
              <table className="table  table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{this.props.profile.get("email")}</td>
                    <td><a href="#" className="btn btn-secondary btn-block btn-outline">Change</a></td>
                  </tr>
                   <tr>
                    <th scope="row">Username</th>
                    <td>{this.props.profile.get("username")}</td>
                    <td><a href="#" className="btn btn-secondary btn-block btn-outline">Change</a></td>
                  </tr>
                  <tr>
                    <th scope="row">Auth Token</th>
                    <td>(hidden)</td>
                    <td><a href="#" className="btn btn-secondary btn-block btn-outline">Refresh</a></td>
                  </tr>
                  <tr>
                    <th scope="row">Password</th>
                    <td colSpan="2"><a href="#" className="btn btn-secondary btn-block btn-outline">Change</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default Profile;
