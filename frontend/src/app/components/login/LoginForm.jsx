// @flow

import React from 'react';
import { Link } from 'react-router';

import ErrorPanel from '../common/ErrorPanel.jsx'

import MainFormContainer from '../form/MainFormContainer.jsx'

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
          "validates": [
            {
              type: "presence"
            },
            {
              type: "min_length",
              value: 3
            },
            {
              type: "max_length",
              value: 500
            },
            {
              type: "like",
              value: "username_or_email"
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
          "validates": [
            {
              type: "presence"
            },
            {
              type: "min_length",
              value: 3
            },
            {
              type: "max_length",
              value: 500
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

  render () {
    if(this.props.profile.get("user_name")) {
      return (
        <div className="has-text-centered">
          <h3> Already logged in as {this.props.profile.get('user_name')} </h3>
        </div>
      )
    } else {
      return(<MainFormContainer form_config={this.get_config()}/>);
    }
  }
}

export default LoginForm;
