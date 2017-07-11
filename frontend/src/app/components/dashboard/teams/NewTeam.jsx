// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import MainFormContainer from '../../form/MainFormContainer.jsx'

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
          "key": "name",
          "order": 1,
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
            console.log(team_name)
          }
        }
      ]
    }
  }

  componentWillMount() {
     if (!this.props.organisation) {
      this.props.get_org()
    }
    this.config = this.get_config()
    this.config_key = this.config["id"]
    this.form_state_key = this.config_key
    this.props.set_form_config(this.config, this.config_key)
    this.props.create_new_form_state(this.form_state_key)
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
