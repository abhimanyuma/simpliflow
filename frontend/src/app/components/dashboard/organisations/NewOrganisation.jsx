// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import MainFormContainer from '../../form/MainFormContainer.jsx'

class NewOrganisation extends React.Component {

  constructor(props) {
    super(props);

  }

  get_config() {
    return {
      "id" : "new-organisation-form",
      "hide_title": true,
      "elements":[
        {
          "key": "name",
          "order": 1,
          "name": "org_name",
          "label": "Organisation Name",
          "placeholder": "New Organisation Name",
          "type": "text",
          "variable": ["org_name"],
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
          "label": "New Organisation",
          "align": "right",
          "callback": (form_state, _form_state_key, dispatch) => {
            let org_name = form_state.get_data("org_name");
            console.log(`Creating ${org_name} company`)
            //dispatch(createOrganisation(org_name))
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

  render() {
    return (
      <div className="card ">
        <div className="card-block">
          <div className="row m2b">
            <div className="col">
              <h4>New Organisations</h4>
            </div>
            <div className="col text-right">
              <Link to="/dashboard/organisations" className="btn btn-secondary"> + View Organisations</Link>
            </div>
          </div>
          <MainFormContainer form_config_key={this.get_config()["id"]} form_state_key={this.get_config()["id"]}/>
        </div>
      </div>
    );
  }
}

export default NewOrganisation;