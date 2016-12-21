import React from 'react';
import { connect } from 'react-redux';

import UserButton from './UserButton.jsx';

import { logoutCurrentProfile } from '../../actions/ProfileActions.js';

let UserButtonContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile,
    }
  },
  function mapDispatchToProps(dispatch) {
    return ({
      logout: (profile) => {
        dispatch(logoutCurrentProfile(profile));
      }
    });
  }
)(UserButton);
export default UserButtonContainer;

