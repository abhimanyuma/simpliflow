// @flow

import React from 'react';
import { Link } from 'react-router';


import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';

import MainFormContainer from '../../form/MainFormContainer.jsx'

import { createTeam } from '../../../actions/TeamActions.js';
import { createRole } from '../../../actions/RoleActions.js';


import * as URL from '../../../common/url.js';

class NewSublevel extends React.Component {

  constructor(props) {
    super(props);

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

  index_link(org_slug) {
    if (this.props.type == "teams") {
      return URL.Team.default_root(org_slug)
    } else if (this.props.type == "roles") {
      return URL.Role.default_root(org_slug)
    }
  }

  edit_link(org_slug, slug) {
    if (this.props.type == "teams") {
      return URL.Team.edit(org_slug, slug)
    } else if (this.props.type == "roles") {
      return URL.Role.edit(org_slug, slug)
    }
  }

  get_config(type) {
    let title_type = this.display_text()
    return {
      "id" : `new-${type}-form`,
      "source": "LOCAL",
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
          "name": "name",
          "label": "Name",
          "placeholder": `New ${title_type} Name`,
          "type": "text",
          "variable": ["name"],
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
          "label": `New ${title_type}`,
          "align": "right",
          "callback": (form_state, _form_state_key, dispatch) => {
            let name = form_state.get_data("name");
            let org_slug = form_state.get_data("organisation_slug")

            if (type == "teams") {
              dispatch(createTeam(name, org_slug, URL.Team.edit))
            } else {
              dispatch(createRole(name, org_slug, URL.Role.edit))
            }
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
     if (!this.props.organisation) {
      this.props.get_org()
    }
    this.config = this.get_config(this.props.type)
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
          <div className="card-body">
            <div className="row m2b">
              <div className="col">
                <h4>New {this.display_text()}</h4>
              </div>
              <div className="col text-right">
                <Link to={this.index_link(this.props.organisation.slug)} className="btn btn-success m2r"><i className="fa fa-users"></i>{this.display_text(true)}</Link>
              </div>
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

export default NewSublevel;
