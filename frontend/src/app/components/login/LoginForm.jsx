// @flow

import React from 'react';
import { Link } from 'react-router';

import ErrorPanel from '../common/ErrorPanel.jsx'

import MainFormContainer from '../form/MainFormContainer.jsx'

import LoadingFormContainer from '../common/LoadingFormContainer.jsx';
import SignupButton from '../common/SignupButton.jsx';

import { loginUser } from '../../actions/ProfileActions.js';

type LoginFormProps = {
  createLoginFormConfig: (any, string) => any,
  profile: UserProfileType
}

class LoginForm extends React.Component {

  constructor(props: LoginFormProps) {
    super(props);
  }

  get_config() {
    return {
      "id" : "login-form",
      "title" : "Login",
      "elements":[
        {
          "key": "username",
          "order": 1,
          "name": "username",
          "label": "Username or Email",
          "placeholder": "Please Enter Your username/email",
          "type": "text",
          "variable": ["username"],
          "icon": "user",
          "validation_rules": [
            {
              type: "presence"
            },
            {
              type: "max_length",
              parameter: 128
            },
            {
              type: "like",
              parameter: "username_or_email"
            }
          ]
        },
        {
          "key": "password",
          "order": 2,
          "name": "password",
          "label": "Password",
          "placeholder":"Please enter your password",
          "type": "password",
          "variable": ["password"],
          "icon": "lock",
          "validation_rules": [
            {
              type: "presence"
            },
            {
              type: "max_length",
              parameter: 128
            }
          ]
        },
        {
          "key": "submit",
          "order": 3,
          "type" : "submit",
          "label": "Login",
          "align": "right",
          "callback": (form_state, dispatch) => {
            let username = form_state.get("username");
            let password = form_state.get("password");
            dispatch(loginUser(username, password))
          }
        }
      ]
    }
  }

  get_login_errors() {
    if (this.props.profile.get("errors")) {
      return(this.props.profile.get("errors"))
    }
  }

  render () {
    if (!this.props.profile.get("sync") || this.props.profile.get("loading")) {
      return(<LoadingFormContainer />);
    } else if(this.props.profile.get("user_name")) {
      return (
        <div className="has-text-centered">
          <div className="card">
            <h3 className="card-header">
              You are already logged in
            </h3>
            <div className="card-block">
              <p className="card-text">
                You are alread logged in as&nbsp;
                {this.props.profile.get("name") || this.props.profile.get("user_name")}.</p>
              <a href="#" className="btn btn-primary">Go to profile</a>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <MainFormContainer form_config={this.get_config()} errors={this.get_login_errors()}/>
          <SignupButton />
        </div>
        );
    }
  }
}

export default LoginForm;
