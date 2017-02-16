//@flow

import React from 'react';
import { connect } from 'react-redux';

import Profile from './Profile.jsx';

let ProfileContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile
    }
  },
  function mapDispatchToProps(dispatch) {
    return ({});
  }
)(Profile);
export default ProfileContainer;

