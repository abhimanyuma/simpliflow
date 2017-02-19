//@flow

import React from 'react';
import { connect } from 'react-redux';

import ChangeProfile from './ChangeProfile.jsx';

let ChangeProfileContainer  = connect(
  function mapStateToProps(state, ownProps) {
    return {
      profile: state.profile,
      type: ownProps.type
    }
  },
  function mapDispatchToProps(dispatch) {
    return ({});
  }
)(ChangeProfile);
export default ChangeProfileContainer;

