//@flow

import React from 'react';
import { connect } from 'react-redux';

import NewTeam from './NewTeam.jsx';

import {getOrganisation} from '../../../actions/OrganisationActions.js';

import MainFormContainer from '../../form/MainFormContainer.jsx'

import { setFormConfig } from '../../../actions/FormConfigActions.js';
import { createNewFormState, setFormStateErrors } from '../../../actions/FormStateActions.js';

let NewTeamContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug

    if (org_slug) {
      response["org_slug"] = org_slug
    }

    if (org_slug && state.organisations && state.organisations.get_model(org_slug)) {
      response["organisation"] = state.organisations.get_model(org_slug)
    }

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_org: () => {
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        dispatch(getOrganisation(org_slug))
      },
      set_form_config: (config_base, config_key) => {
        dispatch(setFormConfig(config_base, config_key))
      },
      create_new_form_state: (state_key) => {
        dispatch(createNewFormState(state_key))
      },
      set_form_state_errors: (state_key, errors) => {
        dispatch(setFormStateErrors(state_key, errors))
      }
    })

  }
)(NewTeam);
export default NewTeamContainer;

