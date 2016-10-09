import React from 'react';

import LoginButton from "../common/LoginButton.jsx";

class LoginInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  computeNameFromProfile(profile) {
    if(profile.synced && profile.get) {
      return profile.get("name");
    }
    return null;
  }

  render() {
    let name = this.computeNameFromProfile(this.props.profile);
    if(name) {
      return( 
        <div className="nav-bar-login-info">
          { name }
        </div>
      );
    } else {
      return(<LoginButton />);
    }
  }
}

export default LoginInfo;
