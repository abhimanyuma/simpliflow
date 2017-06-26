//@flow

import React from 'react';
import { connect } from 'react-redux';

import EditOrganisation from './EditOrganisation.jsx';

import {getOrganisation} from '../../../actions/OrganisationActions.js';

import { setFormConfig } from '../../../actions/FormConfigActions.js';
import { createNewFormState, setFormStateErrors, setFormStateFromModel } from '../../../actions/FormStateActions.js';

let EditOrganisationContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug

    if (org_slug) {
      response["org_slug"] = org_slug
    }

    if (org_slug && state.organisations && state.organisations.get_model(org_slug)) {
      response["organisation"] = state.organisations.get_model(org_slug)
    }

    response["organisations"] = state.organisations

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_org: () => {
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        dispatch(getOrganisation(org_slug))
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
      },
      delete_org: () => {
        console.log("The org now needs to confirm deletion")
      }
    });
  }
)(EditOrganisation);
export default EditOrganisationContainer;

