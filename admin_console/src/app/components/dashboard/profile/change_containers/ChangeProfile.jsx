// @flow

import React from 'react';
import { Link } from 'react-router';

import MainFormContainer from '../../../form/MainFormContainer.jsx';
import { updateUser } from '../../../../actions/ProfileActions.js';

import * as URL from '../../../../common/url.js'

class ChangeProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  get_form_config(type) {
    let initial_config = {
      "id" : "change-profile-from",
      "title" : "Change Profile",
      "style" : "compact",
      "elements":[
        {
          "key": "password",
          "order": 1,
          "name": "Password",
          "label": "Current Password",
          "placeholder": "Enter your Current Password",
          "type": "password",
          "variable": ["password"],
          "icon": "password",
          "validation_rules": [
            {
              type: "presence"
            }
          ]
        }
      ]
    }
    let order = 2;
    let new_elements = null
    let change_element = null
    if (type === "password") {
      new_elements = [
        {
          "key" : "new_password",
          "order": 2,
          "name": "Password",
          "label": "Password",
          "placeholder": "Enter your new password",
          "type": "password",
          "variable": ["new_password"],
          "icon": "password",
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
          "key" : "new_password_confirmation",
          "order": 3,
          "name": "Password Confirmation",
          "label": "Password Confirmation",
          "placeholder": "Enter your new password confirmation",
          "type": "password",
          "variable": ["new_password_confirmation"],
          "icon": "password",
          "validation_rules": [
             {
              type: "equality",
              parameter: "new_password"
            }
          ]
        }
      ]
      change_element = "Password"
    } else if (type == "username") {
      new_elements = [
        {
          "key" : "new_username",
          "order": 2,
          "name": "Username",
          "label": "Username",
          "placeholder": "Enter your new username",
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
        }
      ]
      change_element = "Username"
    } else if (type == "email") {
      new_elements = [
        {
          "key" : "new_email",
          "order": 2,
          "name": "Email",
          "label": "Email",
          "placeholder": "Enter your new email",
          "type": "text",
          "variable": ["email"],
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
              parameter: "email"
            }
          ]
        }
      ]
      change_element = "Email"
    }

    if (new_elements) {
      initial_config.elements = initial_config.elements.concat(new_elements)
    }

    let submit_element = {
      "key": "submit",
      "type" : "submit",
      "label": "Change Profile",
      "align": "right",
      "callback": (form_state, _form_state_key, dispatch) => {
        }
    }

    if (type === "auth_token") {
      submit_element["label"] = "Refresh Auth Token"
      submit_element["order"] = order
      submit_element["callback"] = (form_state, _form_state_key, dispatch) => {
        let data = {}
        data["refresh_auth_token"] = true
        data["password"] = form_state.get_data("password")
        dispatch(updateUser(data))
      }


    } else {
      submit_element["label"] = `Change ${change_element}`
      submit_element["order"] = order
      submit_element["callback"] = (form_state, _form_state_key, dispatch) => {
        let data = {}
        let values_to_get = ["password", "new_password", "new_password_confirmation", "email", "username"]

        for (let value of values_to_get) {
          if (form_state.get_data(value)) {
            data[value] = form_state.get_data(value)
          }
        }
        dispatch(updateUser(data))
      }
    }

    initial_config["elements"].push(submit_element)

    return initial_config;
  }

  componentWillMount() {
    this.config = this.get_form_config(this.props.type)
    this.config_key = this.config["id"]
    this.form_state_key = this.config_key
    this.props.set_form_config(this.config, this.config_key)
    this.props.create_new_form_state(this.form_state_key)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.type != this.props.type) {
      this.config = this.get_form_config(nextProps.type)
      this.props.set_form_config(this.config, this.config_key)
      this.props.create_new_form_state(this.form_state_key)
    } else if (nextProps.profile.get("errors") && nextProps.profile.get("errors").size ) {
      this.props.set_form_state_errors(this.form_state_key, nextProps.profile.get("errors") )
    }
  }

  render() {
    if (this.props.type ) {
      return (
        <div className="m2t">
          <div className="col-lg-6 col-md-9 col-sm-12">
            <MainFormContainer form_config_key={this.get_form_config()["id"]} form_state_key={this.get_form_config()["id"]}/>
          </div>
        </div>
        );
    } else {
      return null;
    }
  }
}

export default ChangeProfile;
