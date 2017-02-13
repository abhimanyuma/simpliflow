// @flow

import React from 'react';
import { Link } from 'react-router';

import MainFormContainer from '../form/MainFormContainer.jsx'

import LoadingFormContainer from '../common/LoadingFormContainer.jsx';
import LoginCard from '../common/LoginCard.jsx';

import { createUser } from '../../actions/ProfileActions.js';

class SignupForm extends React.Component {

  constructor(props): void {
    super(props);
  }


  get_config() {
    return {
      "id" : "signup-form",
      "title" : "Signup",
      "elements":[
        {
          "key": "username",
          "order": 1,
          "name": "username",
          "label": "Username",
          "type": "text",
          "variable": ["username"],
          "icon": "user",
          "validation_rules": [
            {
              type: "min_length",
              parameter: 3
            },
            {
              type: "max_length",
              parameter: 500
            },
            {
              type: "like",
              parameter: "username"
            }
          ]
        },
        {
          "key": "Name",
          "order": 2,
          "name": "name",
          "label": "Name",
          "type": "text",
          "variable": ["name"],
          "icon": "user",
          "validation_rules": [
            {
              type: "min_length",
              parameter: 3
            },
            {
              type: "max_length",
              parameter: 500
            }
          ]
        },
        {
          "key": "email",
          "order":2,
          "name": "email",
          "label": "Email",
          "type": "text",
          "variable": ["email"],
          "icon": "email",
          "validation_rules": [
            {
              type: "min_length",
              parameter: 3
            },
            {
              type: "max_length",
              parameter: 500
            },
            {
              type: "like",
              parameter: "email"
            }
          ]
        },
        {
          "key": "password",
          "order": 3,
          "name": "password",
          "label": "Password",
          "type": "password",
          "variable": ["password"],
          "icon": "lock",
          "validation_rules": [
            {
              type: "min_length",
              parameter: 3
            },
            {
              type: "max_length",
              parameter: 500
            }
          ]
        },
        {
          "key": "password",
          "order": 4,
          "name": "password_confirmation",
          "label": "Cofirm Password",
          "type": "password",
          "variable": ["password_confirmation"],
          "icon": "lock",
          "validation_rules": [
            {
              type: "match",
              parameter: "password"
            }
          ]
        },
        {
          "key": "submit",
          "order": 3,
          "type" : "submit",
          "label": "Login",
          "align": "right",
          "callback": (form_state, form_state_key, dispatch={}) => {
            let data = {}
            data['username'] = form_state.get("username");
            data['name'] = form_state.get("name");
            data['email'] = form_state.get("email");
            data['password'] = form_state.get("password");
            data['password_confirmation'] = form_state.get("password_confirmation")
            dispatch(createUser(data, form_state_key))
          }
        }
      ]
    }
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
          <MainFormContainer form_config={this.get_config()} />
          <LoginCard/>
        </div>
        );
    }
  }
}

export default SignupForm;
