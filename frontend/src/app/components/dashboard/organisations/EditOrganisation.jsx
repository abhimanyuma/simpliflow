// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import MainFormContainer from '../../form/MainFormContainer.jsx'


import { updateOrganisation } from '../../../actions/OrganisationActions.js';

import * as URL from '../../../common/url.js';


class EditOrganisation extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if (!this.props.organisation) {
      this.props.get_org()
    }

    this.config = this.get_config()
    this.config_key = this.config["id"]
    this.form_state_key = this.config_key
    this.props.set_form_config(this.config, this.config_key, false)
    if (this.props.organisation) {
      this.props.set_form_state_from_model(this.form_state_key, this.config, this.props.organisation, true)
    } else {
      this.props.create_new_form_state(this.form_state_key)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.organisation) {
      this.props.set_form_state_from_model(this.form_state_key, this.config, nextProps.organisation, true)
    } else {
      this.props.create_new_form_state(this.form_state_key)
    }
  }

  get_config() {
    return {
      "id" : "edit-organisation-form",
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
          "key": "tagline",
          "order": 3,
          "name": "tagline",
          "label": "Tagline",
          "type": "text",
          "variable": ["tagline"],
          "validation_rules": [
            {
              type: "max_length",
              parameter: 500
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
          "variable": ["members"],
          "id": "search_members_edit_organisation",
          "access_type": "api",
          "search_path": "/users/search",
          "api_variable": "term",
          "modify_path" : "/organisations/1/permissions",
          "modify_variable" : "member_username"
        },
        {
          "key": "submit",
          "order": 6,
          "type" : "submit",
          "label": "Update Organisation",
          "callback": (form_state, form_state_key, dispatch={}) => {
            let data = {}
            let org = this.props.organisation
            data['name'] = form_state.get_data("name");
            data['slug'] = form_state.get_data("slug");
            data['tagline'] = form_state.get_data("tagline");
            data['bio'] = form_state.get_data("bio")
            dispatch(updateOrganisation(org,data))
          }
        }
      ]
    }
  }

  render() {
    if (this.props.organisation && this.props.organisation) {
      return (
        <div className="card ">
          <div className="card-block">
            <div className="row m2b">
              <div className="col">
                <h4>Editing {this.props.organisation.name}</h4>
              </div>
              <div className="col text-right">
                <Link to={URL.Organisation.show(this.props.organisation.slug) } className="btn btn-secondary">Back to Organisation</Link>
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

export default EditOrganisation;
