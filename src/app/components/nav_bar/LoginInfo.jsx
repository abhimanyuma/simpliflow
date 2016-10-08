import React from 'react';
import { Link } from 'react-router';
import store from '../../store/Store.js';

import { GetProfile } from '../../actions/ProfileActions.js';

class LoginInfo extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.profileName = this.profileName.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    store.dispatch(GetProfile());
  }

  componentWillUnmount() {
  }

  _onChange() {
  }

  profileName() {
    if(this.state.profile) {
      return(this.state.profile.name());
    } else {
      return(null);
    }
  }

  render() {
    return (
      <div className="nav-bar-login-info">
        {
          this.profileName() ||
          <Link to="/login">
            <button className="pure-button">
              Login
            </button>
          </Link>
        }
      </div>
    )
  }
}

export default LoginInfo;
