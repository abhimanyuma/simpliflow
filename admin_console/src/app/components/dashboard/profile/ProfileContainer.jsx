//@flow

import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile.jsx';

let ProfileContainer  = connect(
  function mapStateToProps(state, ownProps) {
    return {
      profile: state.profile,
      action: ownProps.location.hash
    }
  },
  function mapDispatchToProps(dispatch) {
    return ({});
  }
)(Profile);
export default ProfileContainer;

