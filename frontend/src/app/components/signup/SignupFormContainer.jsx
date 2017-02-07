/* @flow */

import React from 'react';
import { connect } from 'react-redux';

import SignupForm from './SignupForm.jsx';

import { createUser } from '../../actions/ProfileActions.js';

let SignupFormContainer  = connect(
  function mapStateToProps(state: {profile: UserProfileType, errors: EmptyObject}) {
    return {
        profile: state.profile,
        errors: {}
    }
  },
  function mapDispatchToProps(dispatch: Dispatch) {
    return {
      // signupSubmit: (values) => {
      //   let name = values.name.value;
      //   let password = values.password.value;
      //   let password_confirmation = values.password_confirmation.value;
      //   let email = values.email.value;
      //   dispatch(createUser(name, password, password_confirmation, email));
    }
  }
)(SignupForm);
export default SignupFormContainer;


