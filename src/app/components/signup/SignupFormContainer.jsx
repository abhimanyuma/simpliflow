import React from 'react';
import { connect } from 'react-redux';

import SignupForm from './SignupForm.jsx';

//import { createUser } from '../../actions/ProfileActions.js';

let SignupFormContainer  = connect(
  function mapStateToProps(state) {
    return {
        profile: state.profile,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      signupSubmit: (values) => {
        console.log(values)
      }
    }
  }
)(SignupForm);
export default SignupFormContainer;


