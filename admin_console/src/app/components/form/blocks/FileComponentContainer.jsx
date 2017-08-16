import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FileComponent from './FileComponent.jsx';
import { List } from 'immutable';

let FileComponentContainer  = connect(
  function mapStateToProps(state, ownProps) {

    let props = {}

    props["config"] = ownProps.config || {};
    props["errors"] = ownProps.errors || {};
    props["substate"] = ownProps.substate || {};

    props["update_key"] = ownProps.config.variable[0];
    props["update_state"] = ownProps.update_state
    return(props);
  },
  function mapDispatchToProps(dispatch: Dispatch, ownProps) {

    let dispatch_functions = {}
    let upload_action = ownProps.config.upload_action
    let remove_action = ownProps.config.remove_action

    dispatch_functions["upload_file"] = (file, file_attribute) => {
      let upload_object = ownProps.config.get_upload_object()
      dispatch(upload_action(upload_object, file, file_attribute))
    }

    dispatch_functions["remove_file"] = (file_attribute) => {
      let remove_object = ownProps.config.get_upload_object()
      dispatch(remove_action(remove_object, file_attribute))
    }


    return dispatch_functions;
  }) (FileComponent)

export default FileComponentContainer;