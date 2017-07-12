// @flow

import React from 'react';
import { Link } from 'react-router';


import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import MainFormContainer from '../../form/MainFormContainer.jsx'

import { createTeam } from '../../../actions/TeamActions.js';


import * as URL from '../../../common/url.js';

class NewTeam extends React.Component {

  constructor(props) {
    super(props);

  }

  get_config() {
    return {
      "id" : "new-team-form",
      "hide_title": true,
      "elements":[
        {
          "key": "org_slug",
          "order": 1,
          "name": "org_slug",
          "label": "Organisation Identifier",
          "type": "text",
          "variable": ["organisation_slug"],
          "disabled": true
        },
        {
          "key": "org_name",
          "order": 2,
          "name": "org_slug",
          "label": "Organisation Name",
          "type": "text",
          "variable": ["organisation_name"],
          "disabled": true
        },
        {
          "key": "name",
          "order": 3,
          "name": "team_name",
          "label": "Team Name",
          "placeholder": "New Team Name",
          "type": "text",
          "variable": ["team_name"],
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
          "label": "New Team",
          "align": "right",
          "callback": (form_state, _form_state_key, dispatch) => {
            let team_name = form_state.get_data("team_name");
            let org_slug = form_state.get_data("organisation_slug")
            dispatch(createTeam(team_name, org_slug))
          }
        }
      ]
    }
  }

  update_state(org) {
    if (org) {
      let temp_model ={
        organisation_slug: org.slug,
        organisation_name: org.name
      }
      this.props.set_form_state_from_hash(this.form_state_key, this.config, temp_model, true)
    } else {
      this.props.create_new_form_state(this.form_state_key)
    }
  }

  componentWillMount() {
    console.log("Activated")
     if (!this.props.organisation) {
      this.props.get_org()
    }
    this.config = this.get_config()
    this.config_key = this.config["id"]
    this.form_state_key = this.config_key
    this.props.set_form_config(this.config, this.config_key)
    this.update_state(this.props.organisation)
  }

  componentWillUpdate(nextProps) {
    this.update_state(nextProps.organisation)
  }

  render() {
    if (this.props.organisation) {
      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>New Team</h4>
              </div>
              <div className="col text-right">
                <Link to={URL.Team.default_root(this.props.organisation.slug)} className="btn btn-success m2r"><i className="fa fa-users"></i>Teams</Link>
              </div>
            </div>
            <MainFormContainer form_config_key={this.get_config()["id"]} form_state_key={this.get_config()["id"]}/>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default NewTeam;
