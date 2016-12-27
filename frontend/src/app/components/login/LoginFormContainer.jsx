//@flow

import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm.jsx';

import { loginUser } from '../../actions/ProfileActions.js';

let LoginFormContainer  = connect(
  function mapStateToProps(state: {profile: UserProfileType}) {
    return {
      profile: state.profile,
    }
  },
  function mapDispatchToProps(dispatch: Dispatch) {
    return {
      loginSubmit: (values) => {
        let username = values.username.value;
        let password = values.password.value;
        dispatch(loginUser(username, password));
        values.username.value = "";
        values.password.value = "";
      },
      passwordKeyPress: (event, values, callback) => {
        if (event.charCode == 13) {
          callback(values);
        }
      }
    }
  }
)(LoginForm);
export default LoginFormContainer;


