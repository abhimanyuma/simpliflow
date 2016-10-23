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
      loginSubmit: (event, values) => {
        event.preventDefault();
        let username = values.username.value;
        let password = values.password.value;
        dispatch(loginUser(username, password));
        values.username.value = "";
        values.password.value = "";
      }
    }
  }
)(LoginForm);
export default LoginFormContainer;


