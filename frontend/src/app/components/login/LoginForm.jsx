// @flow

import React from 'react';
import { Link } from 'react-router';

type LoginFormProps = {
  loginSubmit: (any) => any,
  passwordKeyPress: (any, any, any) => any,
  profile: UserProfileType 
}

class LoginForm extends React.Component {

  constructor(props: LoginFormProps) {
    super(props);
  }

  render () {
    if(this.props.profile.get("user_name")) {
      return (
        <div className="has-text-centered">
          <h3> Already logged in as {this.props.profile.get('user_name')} </h3>   
        </div>
      )
    } else {
      return (
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <div className="card is-fullwidth">
              <header className="card-header has-text-centered">
                <p className="card-header-title">
                  Login
                </p>
              </header>
              <div className="card-content">
                <p className="control has-icon">
                  <input className="input" type="text" ref="username" placeholder="Username or Email"/>
                  <i className="fa fa-user"></i>
                </p>
                <p className="control has-icon">
                  <input className="input" type="password" ref="password" placeholder="Password"
                   onKeyPress={e => this.props.passwordKeyPress(e, this.refs, this.props.loginSubmit)}/>
                  <i className="fa fa-lock"></i>
                </p>
              </div>
              <footer className="card-footer">
                <a className="card-footer-item" onClick={e => this.props.loginSubmit(this.refs)}>
                  Login
                </a>
              </footer>
            </div>
            <Link to="/signup" className="button is-outlined is-pulled-right m2t">
              Sign Up
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default LoginForm;
