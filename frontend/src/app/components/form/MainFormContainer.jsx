// @flow

import React from 'react';
import { Link } from 'react-router';
import MainForm from './MainForm.jsx';
import { setFormConfig } from '../../actions/FormConfigActions.js';
import { connect } from 'react-redux';


class MainFormContainer extends React.Component {
  
  constructor(props: any, context) {
    super(props, context);
    this.config = props.form_config;
    this.dispatch = context.store.dispatch;
  }

  render () {
    return(<MainForm form_config = {this.config}/>);
  }
}

MainFormContainer.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default MainFormContainer;
