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
      <div className="btn-group">
        <button type="button" className="btn btn-outline-success my-2 my-sm-0 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.profile.get('user_name')}
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href="#">Profile</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#" onClick={e=> {this.props.logout(this.props.profile)}}>Logout</a>
        </div>
      </div>
    )
  }
}

export default UserButton;
