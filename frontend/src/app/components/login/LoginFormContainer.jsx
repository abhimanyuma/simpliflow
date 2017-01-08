//@flow

import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm.jsx';

import { loginUser } from '../../actions/ProfileActions.js';

let LoginFormContainer  = connect(
  function mapStateToProps(state: {profile: UserProfileType}) {
    let props = {
      profile: state.profile
    }
    return(props);
  },
  function mapDispatchToProps(dispatch: Dispatch) {
    return {}
  }
)(LoginForm);
export default LoginFormContainer;


