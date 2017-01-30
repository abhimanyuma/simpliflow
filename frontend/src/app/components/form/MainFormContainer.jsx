//@flow

import React from 'react';
import { Link } from 'react-router';
import MainForm from './MainForm.jsx';
import { setFormConfig } from '../../actions/FormConfigActions.js';
import { connect } from 'react-redux';
import { createFormStateFromInitialState, createNewFormState } from '../../actions/FormStateActions.js';


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

  render () {
    if (this.config_is_valid() && this.state_is_valid()) {
      let config = this.store.getState().form_config.get(this.config_key);
      return(<MainForm form_config = {config}/>);
    } else {
      return(null);
    }
  }
}

MainFormContainer.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default MainFormContainer;
