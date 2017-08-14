//@flow

import React from 'react';
import { browserHistory } from 'react-router';


class LoginButton extends React.Component {

  constructor(props: any) {
    super(props);
  }

  clickLoginButton(e) {
    e.preventDefault();
    this.props.clickLoginButton();
  }

  render() {
    return (
      <button className="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.clickLoginButton(e)}>
        Login
      </button>
    );
  }
}

export default LoginButton;
