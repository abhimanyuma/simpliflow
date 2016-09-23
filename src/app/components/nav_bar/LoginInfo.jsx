import React from 'react';
import UserModel from '../../models/user_model.js';

class LoginInfo extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.state = {user_model: new UserModel()};
    this.name = this.name.bind(this);
  }

  name() {
    if(this.state.user_model && this.state.user_model.name) {
      return(this.state.user_model.name);
    } else {
      return(null);
    }
  }

  render() {
    console.log(this);
    return (
      <div className="nav-bar-login-info">
        <p>{this.name() || "Login/Signup"}</p>
      </div>
    )
  }
}

export default LoginInfo;
