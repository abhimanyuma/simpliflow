// @flow

import React from 'react';
import { Link } from 'react-router';

class LoginCard extends React.Component {

  constructor(props) {
    super(props);
  }


  render () {
    return (
      <div className="card m2v p2">
        <div className="card-body">
          <h4 className="card-title">Already't have an account?</h4>
          <p className="card-text">
            Go to the login page to login
          </p>
          <Link to="/login" className="btn btn-primary"> Login </Link>
        </div>
      </div>);
  }
}

export default LoginCard;
