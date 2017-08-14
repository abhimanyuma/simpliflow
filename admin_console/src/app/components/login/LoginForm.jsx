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
          "callback": (form_state, _form_state_key, dispatch) => {
            let username = form_state.get_data("username");
            let password = form_state.get_data("password");
            dispatch(loginUser(username, password))
          }
        }
      ]
    }
  }

  componentWillMount() {
    this.config = this.get_config()
    this.config_key = this.config["id"]
    this.form_state_key = this.config_key
    this.props.set_form_config(this.config, this.config_key)
    this.props.create_new_form_state(this.form_state_key)
  }

  componentWillUpdate(nextProps, nextState) {
    let errors = null
    if (nextProps.profile.has_errors()) {
      errors = nextProps.profile.get("errors")
    }

    this.props.set_form_state_errors(this.form_state_key, errors)
  }

  render () {
    if (!this.props.profile.get("sync") || this.props.profile.get("loading")) {
      return(<LoadingFormContainer />);
    } else if(this.props.profile.get("username")) {
      return (
        <div className="has-text-centered">
          <div className="card">
            <h3 className="card-header">
              You are already logged in
            </h3>
            <div className="card-block">
              <p className="card-text">
                You are alread logged in as&nbsp;
                {this.props.profile.get("name") || this.props.profile.get("username")}.</p>
              <a href="#" className="btn btn-primary">Go to profile</a>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <MainFormContainer form_config_key={this.get_config()["id"]} form_state_key={this.get_config()["id"]}/>
          <SignupButton />
        </div>
        );
    }
  }
}

export default LoginForm;
