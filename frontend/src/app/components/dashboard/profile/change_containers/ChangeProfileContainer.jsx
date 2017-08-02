//@flow

import React from 'react';
import { connect } from 'react-redux';

import ChangeProfile from './ChangeProfile.jsx';

import { setFormLocal } from '../../../../actions/FormActions.js';
import { createNewFormState, setFormStateErrors } from '../../../../actions/FormStateActions.js';

let ChangeProfileContainer  = connect(
  function mapStateToProps(state, ownProps) {
    return {
      profile: state.profile,
      type: ownProps.type
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      set_form_config: (config_base, config_key) => {
        dispatch(setFormLocal(config_base, config_key))
      },
      create_new_form_state: (state_key) => {
        dispatch(createNewFormState(state_key))
      },
      set_form_state_errors: (state_key, errors) => {
        dispatch(setFormStateErrors(state_key, errors))
      }
    }
  }
)(ChangeProfile);
export default ChangeProfileContainer;

