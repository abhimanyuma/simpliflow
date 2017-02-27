/* @flow */

import React from 'react';
import { connect } from 'react-redux';

import SignupForm from './SignupForm.jsx';

import { setFormConfig } from '../../actions/FormConfigActions.js';
import { createNewFormState, setFormStateErrors } from '../../actions/FormStateActions.js';

let SignupFormContainer  = connect(
  function mapStateToProps(state: {profile: UserProfileType, errors: EmptyObject}) {
    return {
        profile: state.profile,
        errors: {}
    }
  },
  function mapDispatchToProps(dispatch: Dispatch) {
    return {
      set_form_config: (config_base, config_key) => {
        dispatch(setFormConfig(config_base, config_key))
      },
      create_new_form_state: (state_key) => {
        dispatch(createNewFormState(state_key))
      },
      set_form_state_errors: (state_key, errors) => {
        dispatch(setFormStateErrors(state_key, errors))
      }
    }
  }
)(SignupForm);
export default SignupFormContainer;


