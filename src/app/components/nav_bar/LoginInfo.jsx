import React from 'react';
import ProfileStore from '../../store/profile/ProfileStore.js';
import { Link } from 'react-router';

class LoginInfo extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.getStateFromStores = this.getStateFromStores.bind(this);
    this.profileName = this.profileName.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    window.Dispatcher.dispatch({type:"Profile::Get"});
    window.Store.ProfileStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    window.Store.ProfileStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(this.getStateFromStores());
  }

  getStateFromStores() {
    return({
      profile: window.Store.ProfileStore
    });
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
