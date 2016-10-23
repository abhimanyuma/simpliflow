import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm.jsx';

import { loginUser } from '../../actions/ProfileActions.js';

let LoginFormContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      login: (username, password) => {
        dispatch(loginUser(username, password));
      }
    }
  }
)(LoginForm);
export default LoginFormContainer;


