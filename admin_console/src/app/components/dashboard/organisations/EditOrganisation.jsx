// @flow

import React from 'react';
import { Link } from 'react-router';

import LoadingFormContainer from '../../common/LoadingFormContainer.jsx';
import MainFormContainer from '../../form/MainFormContainer.jsx'


import { updateOrganisation, uploadFileOrganisation, removeFileOrganisation } from '../../../actions/OrganisationActions.js';

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
          "key": "logo",
          "order": 4,
          "name": "logo",
          "label": "Logo",
          "type": "file",
          "variable": ["logo"],
          "upload_action": uploadFileOrganisation,
          "remove_action": removeFileOrganisation,
          "get_upload_object": () => {
            return this.props.organisation
          }
        },
        {
          "key": "members",
          "order": 5,
          "name": "members",
          "label": "Members",
          "type": "selectlist",
          "variable": ["members", "organisation_slug", "user_level"],
          "id": "search_members_edit_organisation",
          "access_type": "api",
          "search_path": "/users/search",
          "api_variable": "term",
          "modify_path" : "/organisations/:organisation_slug/permissions",
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
            data['logo'] = form_state.get_data("logo")
            dispatch(updateOrganisation(org,data))
          }
        }
      ]
    }
  }

  render() {
    if (this.props.organisation) {
      return (
        <div className="card ">
          <div className="card-body">
            <div className="row m2b">

              <div className="col">
                <Link to={URL.Organisation.show(this.props.organisation.slug)} className="btn btn-secondary">
                  <i className="fa fa-arrow-circle-left" /> Back to Organisation
                </Link>
              </div>
            </div>
            <hr />
            <div className="row m2b">
             <div className="col">
                <h4>Editing {this.props.organisation.name} <small> {this.props.organisation.user_display_level()} </small></h4>
              </div>
              { this.props.organisation.is_owner() &&
              <div className="col text-right">
                <Link to={URL.Organisation.delete(this.props.organisation.slug)} className="btn btn-outline-danger">
                  <i className="fa fa-trash-o" /> Delete Organisation
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

export default EditOrganisation;
