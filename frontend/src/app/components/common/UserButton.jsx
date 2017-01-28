// @flow

import React from 'react';
import { Link } from 'react-router';

type PropType = {
  logout: (UserProfileType) => Function,
  profile: UserProfileType
}

class UserButton extends React.Component {

  constructor(props: PropType) {
    super(props);
  }

  render() {
    return (
      <button className="btn btn-outline-success my-2 my-sm-0" >
        {this.props.profile.get('user_name')}
      </button>
    )
  }
}

export default UserButton;
