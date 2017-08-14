//@flow

import React from 'react';
import { connect } from 'react-redux';

import NewOrganisation from './NewOrganisation.jsx';

import {getUserOrganisations} from '../../../actions/UserOrganisationActions.js';

import { setFormConfig } from '../../../actions/FormConfigActions.js';
import { createNewFormState, setFormStateErrors } from '../../../actions/FormStateActions.js';

let NewOrganisationContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile,
      organisations: state.user_organisations.get("models"),
    }
  },
  function mapDispatchToProps(dispatch) {
    return ({
      set_form_config: (config_base, config_key) => {
        dispatch(setFormConfig(config_base, config_key))
      },
      create_new_form_state: (state_key) => {
        dispatch(createNewFormState(state_key))
      },
      set_form_state_errors: (state_key, errors) => {
        dispatch(setFormStateErrors(state_key, errors))
      }
    });
  }
)(NewOrganisation);
export default NewOrganisationContainer;

