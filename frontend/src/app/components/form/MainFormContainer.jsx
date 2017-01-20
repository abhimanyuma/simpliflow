// @flow

import React from 'react';
import { Link } from 'react-router';
import MainForm from './MainForm.jsx';
import { setFormConfig } from '../../actions/FormConfigActions.js';
import { connect } from 'react-redux';
import { createFormConfigFromConfig } from '../../actions/FormConfigActions.js';

class MainFormContainer extends React.Component {
  
  constructor(props: any, context) {
    super(props, context);
    this.config = props.form_config;
    if (props.form_config_key) {
      this.config_key = props.form_config_key;
    } else {
      this.config_key = props.form_config["id"]
    }
    this.store = context.store
    if (this.store.getState().form_config && this.store.getState().form_config.get(this.config_key)) {
      this.config = this.store.getState().form_config.get(this.config_key)
    } else if (this.config) {
      createFormConfigFromConfig(this.config, this.config_key)(context.store.dispatch)
    }
    context.store.subscribe(() => {this.on_store_change()})
  }

  on_store_change() {
    this.render()
  }

  config_is_valid() {
    return (this.store.getState().form_config && 
            (typeof(this.store.getState().form_config.get) == "function") && 
            this.store.getState().form_config.get(this.config_key)
    )
  }

  render () {
    if (this.config_is_valid()) {
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
