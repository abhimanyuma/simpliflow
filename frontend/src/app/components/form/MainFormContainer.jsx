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

    props["config_key"] = ownProps.form_config_key || null;
    props["form_state_key"] = ownProps.form_state_key || props["config_key"];

    let form_config = state.form_config && (typeof(state.form_config.get) === "function")
    if (form_config) {
      props["form_config"] = state.form_config.get(props["config_key"])
    }

    let form_state = state.form_state && (typeof(state.form_state.get) === "function")
    if (form_state) {
      props["form_state"] = state.form_state.get(props["form_state_key"])
    }

    return(props);
  },
  function mapDispatchToProps(dispatch: Dispatch, ownProps) {

    let config = null;
    let config_key = null;

    let dispatch_functions = {}

    dispatch_functions["update_state"] = (form_state_key, update_value) => {
      dispatch(updateFormState(form_state_key, update_value))
    }

    dispatch_functions["on_submit"] = (form_state, form_state_key, form_config) => {
      if (form_config.get("elements") && form_config.get("elements")) {
        for (let element of form_config.get("elements")) {
          if (element["type"] === "submit" && element["callback"]) {
            element["callback"](form_state, form_state_key, dispatch)
            break;
          }
        }
      }
    }

    dispatch_functions["set_errors"] = (form_state_key, errors) => {
      dispatch(setFormStateErrors(form_state_key, errors))
    }

    return dispatch_functions;
  },
  function mergeProps(stateProps, dispatchProps, ownProps) {
    // Doing so that we don't pass all props down
    return Object.assign({}, stateProps, dispatchProps)
  }) (MainForm)

export default MainFormContainer;
