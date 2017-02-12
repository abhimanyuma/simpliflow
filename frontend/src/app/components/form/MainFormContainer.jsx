//@flow

import React from 'react';
import { Link } from 'react-router';
import MainForm from './MainForm.jsx';
import { setFormConfig } from '../../actions/FormConfigActions.js';
import { connect } from 'react-redux';
import { createFormStateFromInitialState, createNewFormState, updateFormState, setFormStateErrors } from '../../actions/FormStateActions.js';


let MainFormContainer  = connect(
  function mapStateToProps(state, ownProps) {


    let props = {}

    props["config_key"] = ownProps.form_config_key || ownProps.form_config["id"] || null;
    props["form_state_key"] = ownProps.form_state_key || props["config_key"];

    let form_config = state.form_config && (typeof(state.form_config.get) === "function") && state.form_config.get(props["config_key"])
    if (form_config) {
      props["form_config"] = form_config
    }

    let form_state = state.form_state && (typeof(state.form_state.get) === "function") && state.form_state.get(props["form_state_key"])
    if (form_state) {
      props["form_state"] = form_state
    }

    if (ownProps.form_config) {
      props["config_native_object"] = ownProps.form_config
    }

    return(props);
  },
  function mapDispatchToProps(dispatch: Dispatch, ownProps) {

    let config = null;
    let config_key = null;

    let dispatch_functions = {}

    dispatch_functions["setup_config"] = (config, config_key) => {
      dispatch(setFormConfig(config, config_key))
    }

    dispatch_functions["setup_new_form_state"] = (form_state_key) => {
      dispatch(createNewFormState(form_state_key))
    }

    dispatch_functions["update_state"] = (form_state_key, update_value) => {
      dispatch(updateFormState(form_state_key, update_value))
    }

    dispatch_functions["on_submit"] = (form_state_key, form_config_key) => {
      dispatch(checkFormStateErrors(form_state_key, form_config_key))
    }

    dispatch_functions["set_errors"] = (form_state_key, errors) => {
      dispatch(setFormStateErrors(form_state_key, errors))
    }

    return dispatch_functions;
  },
  function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, stateProps, dispatchProps)
  }) (MainForm)

export default MainFormContainer;
