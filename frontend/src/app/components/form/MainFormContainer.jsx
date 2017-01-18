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
    this.config_key = props.form_config_key;
    this.store = context.store
    if (this.config) {
      this.valid = false
      createFormConfigFromConfig(this.config, this.config_key)(context.store.dispatch)
    }
    context.store.subscribe(() => {this.on_store_change()})

  }

  on_store_change() {
    if (this.store.getState().form_config && this.store.getState().form_config.get(this.config_key)) {
      this.valid = true
    }
  }

  render () {
    if (this.config_key && this.config && this.valid) {
      return(<MainForm form_config_key = {this.config_key}/>);
    } else {
      return(null);
    }
  }
}

MainFormContainer.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default MainFormContainer;
