//@flow

import React from 'react';
import { connect } from 'react-redux';

import NewSublevel from './NewSublevel.jsx';

import {getOrganisation} from '../../../actions/OrganisationActions.js';



import { setFormConfig } from '../../../actions/FormConfigActions.js';
import { createNewFormState, setFormStateErrors, setFormStateFromHash } from '../../../actions/FormStateActions.js';

let NewSublevelContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.routeParams.org_slug || ownProps.org_slug
    let type = ownProps.route.type || ownProps.type

    response["org_slug"] = org_slug
    response["type"] = type

    if (org_slug && state.organisations && state.organisations.get_model) {
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
      },
      set_form_state_from_hash: (state_key, config, model, reset) => {
        dispatch(setFormStateFromHash(state_key, config, model, reset))
      }

    })

  }
)(NewSublevel);
export default NewSublevelContainer;

