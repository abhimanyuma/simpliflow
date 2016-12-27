//@flow

import React from 'react';
import { Link } from 'react-router';


class LoginButton extends React.Component {

  constructor(props: EmptyObject) {
    super(props);
  }

  render() {
    return (
      <Link to="/login" className="button"> 
        <span className="icon">
          <i className="fa fa-user"></i>
        </span>
        <span>Login</span>
      </Link>
    )
  }
}

export default LoginButton;
