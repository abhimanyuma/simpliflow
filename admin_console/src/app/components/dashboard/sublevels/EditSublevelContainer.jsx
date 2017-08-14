//@flow

import React from 'react';
import { connect } from 'react-redux';

import EditSublevel from './EditSublevel.jsx';

import {getOrganisation} from '../../../actions/OrganisationActions.js';
import {getTeam} from '../../../actions/TeamActions.js';
import {getRole} from '../../../actions/RoleActions.js';

import { setFormConfig } from '../../../actions/FormConfigActions.js';
import { createNewFormState, setFormStateErrors, setFormStateFromModel } from '../../../actions/FormStateActions.js';

let EditSublevelContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.routeParams.org_slug || ownProps.org_slug
    let sublevel_slug = ownProps.routeParams.sublevel_slug || ownProps.team_slug || ownProps.role_slug
    let type = ownProps.route.type


    response["org_slug"] = org_slug
    response["sublevel_slug"] = sublevel_slug
    response["type"] = type

    if (org_slug && state.organisations && state.organisations.get_model) {
      response["organisation"] = state.organisations.get_model(org_slug)
    }

    if (sublevel_slug) {
      if (type == "teams" && state.teams && state.teams.get_model) {
        response["sublevel"] = state.teams.get_model(`${org_slug}/${sublevel_slug}`)
      } else if (type == "roles" && state.roles && state.roles.get_model) {
        response["sublevel"] = state.roles.get_model(`${org_slug}/${sublevel_slug}`)
      }
    }

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_org: () => {
        let org_slug = ownProps.routeParams.org_slug || ownProps.org_slug
        dispatch(getOrganisation(org_slug))
      },
      get_sublevel: () => {
        let org_slug = ownProps.routeParams.org_slug || ownProps.org_slug
        let sublevel_slug = ownProps.routeParams.sublevel_slug || ownProps.team_slug || ownProps.role_slug
        let type = ownProps.route.type || ownProps.type

        if (type == "teams") {
          dispatch(getTeam(org_slug, sublevel_slug))
        } else if (type == "roles") {
          dispatch(getRole(org_slug, sublevel_slug))
        }
      },
      set_form_config: (config_base, config_key, reset) => {
        dispatch(setFormConfig(config_base, config_key, reset))
      },
      create_new_form_state: (state_key) => {
        dispatch(createNewFormState(state_key))
      },
      set_form_state_errors: (state_key, errors) => {
        dispatch(setFormStateErrors(state_key, errors))
      },
      set_form_state_from_model: (state_key, config, model, reset) => {
        dispatch(setFormStateFromModel(state_key, config, model, reset ))
      }
    });
  }
)(EditSublevel);
export default EditSublevelContainer;

