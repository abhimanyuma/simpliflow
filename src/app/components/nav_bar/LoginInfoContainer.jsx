import React from 'react';
import { connect } from 'react-redux';

import LoginInfo from './LoginInfo.jsx';

import { GetProfile } from '../../actions/ProfileActions.js';

let LoginInfoContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      getProfile: () => {
        dispatch(GetProfile())
      }
    }
  }
)(LoginInfo);
export default LoginInfoContainer;

