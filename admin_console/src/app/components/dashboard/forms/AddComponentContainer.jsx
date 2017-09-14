//@flow

import React from 'react';
import { connect } from 'react-redux';

import AddComponent from './AddComponent.jsx';

import { getComponents } from '../../../actions/ComponentActions.js';

let AddComponentContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    response["components"] =  state.components.models
    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_components() {
        dispatch(getComponents())
      }


    });
  }
)(AddComponent);
export default AddComponentContainer;

