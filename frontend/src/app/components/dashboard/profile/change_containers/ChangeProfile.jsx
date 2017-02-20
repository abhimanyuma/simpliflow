// @flow

import React from 'react';
import { Link } from 'react-router';

import MainFormContainer from '../../../form/MainFormContainer.jsx';
import { updateUser } from '../../../../actions/ProfileActions.js';

class ChangeProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  get_form_config(type) {
    console.log(type)
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
    let submit_element = {
      "key": "submit",
      "type" : "submit",
      "label": "Change Profile",
      "align": "right",
      "callback": (form_state, _form_state_key, dispatch) => {
        console.log ("We are here", form_state)
        }
    }

    if (type === "auth_token") {
      submit_element["label"] = "Refresh Auth Token"
      submit_element["order"] = order
      submit_element["callback"] = (form_state, _form_state_key, dispatch) => {
        let data = {}
        console.log("We are here")
        data["refresh_auth_token"] = true
        data["password"] = form_state.get("password")
        dispatch(updateUser(data))
      }

      initial_config["elements"].push(submit_element)
      return(initial_config)
    }

    return initial_config;
  }

  render() {
    if (this.props.type ) {
      return (
        <div className="m2t">
          <div className="col-lg-6 col-md-9 col-sm-12">
            <MainFormContainer form_config={this.get_form_config(this.props.type)} />
          </div>
        </div>
        );
    } else {
      return null;
    }
  }
}

export default ChangeProfile;
