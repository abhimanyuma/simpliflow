// @flow

import React from 'react';
import { Link } from 'react-router';

class SignupButton extends React.Component {

  constructor(props) {
    super(props);
  }


  render () {
    return (
      <div className="card m2v p2">
        <div className="card-body">
          <h4 className="card-title">Don't have an account?</h4>
          <p className="card-text">
            Create easy to use, simple webforms and workflows
          </p>
          <Link to="/signup" className="btn btn-primary"> Signup </Link>
        </div>
      </div>);
  }
}

export default SignupButton;
