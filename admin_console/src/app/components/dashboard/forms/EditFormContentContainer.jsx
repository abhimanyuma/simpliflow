//@flow

import React from 'react';
import { connect } from 'react-redux';

import EditFormContent from './EditFormContent.jsx';

import { setFormLocal } from '../../../actions/FormActions.js';
import { createNewFormState, setFormStateErrors, setFormStateFromModel } from '../../../actions/FormStateActions.js';

let EditFormContentContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let form = ownProps.form

    response["form"] = form

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      set_form_config: (config_base, config_key, reset) => {
        dispatch(setFormLocal(config_base, config_key, reset))
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
)(EditFormContent);
export default EditFormContentContainer;

