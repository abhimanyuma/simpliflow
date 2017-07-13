//@flow

import React from 'react';
import { connect } from 'react-redux';

import EditTeam from './EditTeam.jsx';

import {getOrganisation} from '../../../actions/OrganisationActions.js';
import {getTeam} from '../../../actions/TeamActions.js';

import { setFormConfig } from '../../../actions/FormConfigActions.js';
import { createNewFormState, setFormStateErrors, setFormStateFromModel } from '../../../actions/FormStateActions.js';

let EditTeamContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
    let team_slug = ownProps.team_slug || ownProps.routeParams.team_slug

    if (org_slug) {
      response["org_slug"] = org_slug
    }

    if (team_slug) {
      response["team_slug"] = team_slug
    }

    if (org_slug && state.organisations && state.organisations.get_model) {
      response["organisation"] = state.organisations.get_model(org_slug)
    }

     if (team_slug && state.teams && state.teams.get_model) {
      response["team"] = state.teams.get_model(`${org_slug}/${team_slug}`)
      console.log("Macha")
    }

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_org: () => {
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        dispatch(getOrganisation(org_slug))
      },
      get_team: () => {
        let team_slug = ownProps.team_slug || ownProps.routeParams.team_slug
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        dispatch(getTeam(org_slug,team_slug))
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
)(EditTeam);
export default EditTeamContainer;

