//@flow

import React from 'react';
import { Link } from 'react-router';
import MainForm from './MainForm.jsx';
import { setFormConfig } from '../../actions/FormConfigActions.js';
import { connect } from 'react-redux';
import { createFormStateFromInitialState, createNewFormState, updateFormState, checkFormStateErrors } from '../../actions/FormStateActions.js';


class MainFormContainer extends React.Component {

  constructor(props: any, context) {
    super(props, context);
    this.config = props.form_config;
    if (props.form_config_key) {
      this.config_key = props.form_config_key;
    } else {
      this.config_key = props.form_config["id"]
    }

    if (props.form_state_key) {
      this.form_state_key = props.form_state_key
    } else if (this.config_key) {
      this.form_state_key = this.config_key
    }

    this.store = context.store

    context.store.subscribe(() => {this.on_store_change()})
  }

  componentWillMount() {
    if (this.config_is_valid()) {
      this.config = this.store.getState().form_config.get(this.config_key)
    } else if (this.config) {
      this.store.dispatch(setFormConfig(this.config, this.config_key))
    }

    if (this.state_is_valid()) {
      this.config = this.store.getState().form_state.get(this.config_key)
    } else if (this.form_state) {
      //createFormStateFromInitialState(this.form_state, this.form_state_key)(context.store.dispatch)
    } else {
      this.store.dispatch(createNewFormState(this.form_state_key))
    }
  }

  on_store_change() {
    this.render()
  }

  config_is_valid() {
    window.ad = this.store.getState()
    return (this.store.getState().form_config &&
            (typeof(this.store.getState().form_config.get) == "function") &&
            this.store.getState().form_config.get(this.config_key)
    )
  }

  state_is_valid() {
    return (this.store.getState().form_state &&
            (typeof(this.store.getState().form_state.get) == "function") &&
            this.store.getState().form_state.get(this.form_state_key)
    )
  }

  update_state(update_value) {
    this.store.dispatch(updateFormState(this.form_state_key, update_value))
  }

  on_submit_clean() {

    let cfg = this.store.getState().form_config.get(this.config_key);
    let submit_button = null;

    if (cfg && (typeof(cfg.get) == "function") && cfg.get("elements")) {
      for (let element of cfg.get("elements")) {
        if (element["key"] == "submit") {
          submit_button = element;
        }
      }
    }
    let form_state = this.store.getState().form_state.get(this.form_state_key)
    if (submit_button && form_state) {
      submit_button["callback"](form_state, this.store.dispatch)
    }
  }

  on_submit(e) {
    e.preventDefault();
    let form_config = this.store.getState().form_config.get(this.config_key);
    let form_state  = this.store.getState().form_state.get(this.form_state_key);
    this.store.dispatch(checkFormStateErrors(form_state, form_config, this.form_state_key, this.on_submit_clean));
  }

  render () {
    console.log("Rendered again")
    if (this.config_is_valid() && this.state_is_valid()) {
      let config = this.store.getState().form_config.get(this.config_key);
      let form_state = this.store.getState().form_state.get(this.form_state_key);
      return(<MainForm form_config = {config} form_state = {form_state} update_state={(e) => {this.update_state(e)}} on_submit={(e) => {this.on_submit(e)}}/>);
    } else {
      return(null);
    }
  }
}

MainFormContainer.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default MainFormContainer;
