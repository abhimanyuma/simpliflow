//@flow

import React from 'react';

import LoginButton from "../common/LoginButton.jsx";
import UserButtonContainer from "../common/UserButtonContainer.jsx";

type LoginInfoPropType = {
  profile: UserProfileType,
  loadProfile: () => Function
}

class LoginInfo extends React.Component {

  constructor(props: LoginInfoPropType): void {
    super(props);
    if(!props.profile || !props.profile.get("loaded")) {
      props.loadProfile();
    }
  }

  computeNameFromProfile(profile: UserProfileType): ?string {
    if(profile.get("sync") && profile.get) {
      return profile.get("name");
    }
    return null;
  }

  render() {
    let name = this.computeNameFromProfile(this.props.profile);
    if(name) {
      return( 
        <div className="nav-right nav-menu">
          <span className="nav-item">
            <UserButtonContainer/>
          </span>
        </div>
      );
    } else {
      return(
        <div className="nav-right nav-menu">
          <span className="nav-item">
            <LoginButton/>
          </span>
        </div>
      );
    }
  }
}

export default LoginInfo;
