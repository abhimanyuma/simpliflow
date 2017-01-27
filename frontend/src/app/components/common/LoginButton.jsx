//@flow

import React from 'react';
import { Link } from 'react-router';


class LoginButton extends React.Component {

  constructor(props: EmptyObject) {
    super(props);
  }

  render() {
    return (
      <button className="btn btn-outline-success my-2 my-sm-0" >
        Login
      </button>
    );
  }
}

export default LoginButton;
