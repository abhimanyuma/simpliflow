// @flow

import React from 'react';
import { Link } from 'react-router';

import ErrorPanel from '../common/ErrorPanel.jsx'

type LoginFormProps = {
  loginSubmit: (any) => any,
  passwordKeyPress: (any, any, any) => any,
  profile: UserProfileType 
}

class LoginForm extends React.Component {

  constructor(props: LoginFormProps) {
    super(props);
  }

  has_error (key: string): boolean {
    return (this.props.profile.get("errors") && this.props.profile.get("errors")[key]);
  }

  get_errors (key: string): string {
    let errors = this.props.profile.get("errors")[key];
    if ((typeof(errors) == "string") || (errors instanceof String)) {
      return (errors);
    } else if (errors instanceof Array) {
      return (errors.join(". "))
    } else {
      return null;
    }
  }

  global_error_box() {
    let errors = this.props.profile.get("errors")
    let error_panel = null
    if (errors && errors["global"]) {
      error_panel = <ErrorPanel errors={errors["global"]} />
    }
    return error_panel;
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
                {this.global_error_box()}
                <p className="control has-icon">
                  <input className={this.has_error('username')?'input is-danger':'input'} type="text" ref="username" placeholder="Username or Email"/>
                  <i className="fa fa-user"></i>
                  {this.has_error('username') && <span className="help is-danger">{this.get_errors('username')}</span>}
                </p>
                <p className="control has-icon">
                  <input className={this.has_error('password')?'input is-danger':'input'} type="password" ref="password" placeholder="Password"
                   onKeyPress={e => this.props.passwordKeyPress(e, this.refs, this.props.loginSubmit)}/>
                  <i className="fa fa-lock"></i>
                  {this.has_error('password') && <span className="help is-danger">{this.get_errors('password')}</span>}
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
