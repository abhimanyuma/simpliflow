// @flow

import React from 'react';
import { connect } from 'react-redux';

import LoginInfo from './LoginInfo.jsx';

import { fetchProfile } from '../../actions/ProfileActions.js';

let LoginInfoContainer  = connect(
  function mapStateToProps(state: {profile: UserProfileType}) {
    return {
      profile: state.profile,
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

