//@flow

import React from 'react';

import LoginButtonContainer from "../common/LoginButtonContainer.jsx";
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

    let name: any = null
    if(profile.get("sync") && profile.get("name")) {
      name =  profile.get("name")
    }

    if (name) {
      return name.toString()
    } else {
      return null;
    }
  }

  render() {
    let name = this.computeNameFromProfile(this.props.profile);
    if(name) {
      return(
        <UserButtonContainer/>
      );
    } else {
      return(
        <LoginButtonContainer/>
      );
    }
  }
}

export default LoginInfo;
