// @flow

import React from 'react';
import { connect } from 'react-redux';

import LoginInfo from './LoginInfo.jsx';

import { fetchProfile } from '../../actions/ProfileActions.js';

let LoginInfoContainer  = connect(
  function mapStateToProps(state: {profile: UserProfileType}, ownProps) {
    return {
      profile: state.profile,
      show_button: ownProps.show_login
    }
  },
  function mapDispatchToProps(dispatch: Dispatch) {
    return {
      loadProfile: () => {
        dispatch(fetchProfile())
      }
    }
  }
)(LoginInfo);
export default LoginInfoContainer;

