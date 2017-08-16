// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import MainFormContainer from '../../form/MainFormContainer.jsx'

import { updateTeam } from '../../../actions/TeamActions.js';
import { updateRole } from '../../../actions/RoleActions.js';


import * as URL from '../../../common/url.js';


class EditSublevel extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {

    this.props.get_sublevel()

    this.config = this.get_config(this.props.type)
    this.config_key = this.config["id"]
    this.form_state_key = this.config_key
    this.props.set_form_config(this.config, this.config_key, false)
    if (this.props.sublevel) {
      this.props.set_form_state_from_model(this.form_state_key, this.config, this.props.sublevel, true)
    } else {
      this.props.create_new_form_state(this.form_state_key)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.sublevel) {
      this.props.set_form_state_from_model(this.form_state_key, this.config, nextProps.sublevel, true)
    } else {
      this.props.create_new_form_state(this.form_state_key)
    }
  }

  display_text(plural) {
    let text = ""
    if (this.props.type == "teams") {
      text =  "Team"
    } else if (this.props.type == "roles") {
      text =  "Role"
    }
    if (text && plural) {
      text = `${text}s`
    }
    return text
  }

  show_link(org_slug, slug) {
    if (this.props.type == "teams") {
      return URL.Team.show(org_slug, slug)
    } else if (this.props.type == "roles") {
      return URL.Role.show(org_slug, slug)
    }
  }

  delete_link(org_slug, slug) {
    if (this.props.type == "teams") {
      return URL.Team.delete(org_slug, slug)
    } else if (this.props.type == "roles") {
      return URL.Role.delete(org_slug, slug)
    }
  }

  get_config(type) {
    return {
      "id" : `edit-${type}-form`,
      "source": "LOCAL",
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
          "variable": ["members", "organisation_slug", "slug", "user_level"],
          "id": "search_members_edit_sublevel",
          "access_type": "api",
          "search_path": "/users/search",
          "api_variable": "term",
          "modify_path" : `/organisations/:organisation_slug/${type}/:slug/permissions`,
          "modify_variable" : "member_username"
        },
        {
          "key": "submit",
          "order": 6,
          "type" : "submit",
          "label": `Update ${this.display_text()}`,
          "callback": (form_state, form_state_key, dispatch={}) => {
            let data = {}
            let sublevel = this.props.sublevel
            data['name'] = form_state.get_data("name");
            data['slug'] = form_state.get_data("slug");
            data['bio'] = form_state.get_data("bio");
            data['organisation_slug'] = form_state.get_data("organisation_slug")
            if (this.props.type == "teams") {
              dispatch(updateTeam(sublevel, data))
            } else if (this.props.type == "roles") {
              dispatch(updateRole(sublevel, data))
            }
          }
        }
      ]
    }
  }

  render() {
    if (this.props.sublevel) {
      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">

              <div className="col">
                <Link to={this.show_link(this.props.sublevel.organisation_slug, this.props.sublevel.slug)} className="btn btn-secondary">
                  <i className="fa fa-arrow-circle-left" /> Back to {this.display_text()}
                </Link>
              </div>
            </div>
            <hr />
            <div className="row m2b">
             <div className="col">
                <h4>Editing {this.props.sublevel.name} <small> {this.props.sublevel.user_display_level()} </small></h4>
              </div>
              { this.props.sublevel.is_owner() &&
              <div className="col text-right">
                <Link to={this.delete_link(this.props.sublevel.organisation_slug, this.props.sublevel.slug)} className="btn btn-outline-danger">
                  <i className="fa fa-trash-o" /> Delete {this.display_text()}
                </Link>
              </div>
              }
            </div>
            <MainFormContainer form_config_key={this.get_config(this.props.type)["id"]} form_state_key={this.get_config(this.props.type)["id"]}/>
          </div>
        </div>
      );
    } else {
      return (<LoadingFormContainer />);
    }
  }
}

export default EditSublevel;
