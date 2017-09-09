//@flow

import React from 'react';
import { connect } from 'react-redux';

import AddComponent from './AddComponent.jsx';

let AddComponentContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({

    });
  }
)(AddComponent);
export default AddComponentContainer;

