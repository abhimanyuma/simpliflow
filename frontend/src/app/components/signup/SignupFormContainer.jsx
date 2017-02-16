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
    return {}
  }
)(SignupForm);
export default SignupFormContainer;


