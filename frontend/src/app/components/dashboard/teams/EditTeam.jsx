// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import MainFormContainer from '../../form/MainFormContainer.jsx'


import { updateTeam } from '../../../actions/TeamActions.js';

import * as URL from '../../../common/url.js';


class EditTeam extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if (!this.props.organisation) {
      this.props.get_org()
    }
    if (!this.props.team) {
      this.props.get_team()
    }

    this.config = this.get_config()
    this.config_key = this.config["id"]
    this.form_state_key = this.config_key
    this.props.set_form_config(this.config, this.config_key, false)
    if (this.props.team) {
      this.props.set_form_state_from_model(this.form_state_key, this.config, this.props.team, true)
    } else {
      this.props.create_new_form_state(this.form_state_key)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.team) {
      this.props.set_form_state_from_model(this.form_state_key, this.config, nextProps.team, true)
    } else {
      this.props.create_new_form_state(this.form_state_key)
    }
  }

  get_config() {
    return {
      "id" : "edit-team-form",
      "hide_title": true,
      "elements":[
        {
          "key": "name",
          "order": 1,
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
          "key": "organisation_slug",
          "order": 4,
          "name": "Organisation Slug",
          "label": "Organisation",
          "type": "text",
          "variable": ["organisation_slug"],
          "icon": "user",
          "disabled": true,
        },
        {
          "key": "slug",
          "order": 2,
          "name": "slug",
          "label": "Slug",
          "type": "text",
          "variable": ["slug"],
          "validation_rules": [
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
          "key": "bio",
          "order": 4,
          "name": "bio",
          "label": "Bio",
          "type": "textarea",
          "variable": ["bio"],
          "validation_rules": [
            {
              type: "max_length",
              parameter: 500
            }
          ]
        },
        {
          "key": "members",
          "order": 5,
          "name": "members",
          "label": "Members",
          "type": "selectlist",
          "variable": ["members", "organisation_id", "team_id", "user_level"],
          "id": "search_members_edit_team",
          "access_type": "api",
          "search_path": "/users/search",
          "api_variable": "term",
          "modify_path" : "/organisations/:organisation_id/team/:team_id/permissions",
          "modify_variable" : "member_username"
        },
        {
          "key": "submit",
          "order": 6,
          "type" : "submit",
          "label": "Update Team",
          "callback": (form_state, form_state_key, dispatch={}) => {
            let data = {}
            let team = this.props.team
            data['name'] = form_state.get_data("name");
            data['slug'] = form_state.get_data("slug");
            data['bio'] = form_state.get_data("bio");
            data['organisation_slug'] = form_state.get_data("organisation_slug")
            dispatch(updateTeam(team,data))
          }
        }
      ]
    }
  }

  render() {
    if (this.props.organisation && this.props.team) {
      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">

              <div className="col">
                <Link to={URL.Team.default_root(this.props.team.organisation_slug)} className="btn btn-secondary">
                  <i className="fa fa-arrow-circle-left" /> Back to Teams
                </Link>
              </div>
            </div>
            <hr />
            <div className="row m2b">
             <div className="col">
                <h4>Editing {this.props.team.name} <small> {this.props.team.user_display_level()} </small></h4>
              </div>
              { this.props.team.is_owner() &&
              <div className="col text-right">
                <Link to={URL.Team.delete(this.props.team.slug)} className="btn btn-outline-danger">
                  <i className="fa fa-trash-o" /> Delete Team
                </Link>
              </div>
              }
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

export default EditTeam;
