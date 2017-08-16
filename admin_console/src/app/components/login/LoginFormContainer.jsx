//@flow

import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm.jsx';

import { setFormLocal } from '../../actions/FormActions.js';
import { createNewFormState, setFormStateErrors } from '../../actions/FormStateActions.js';

let LoginFormContainer  = connect(
  function mapStateToProps(state: {profile: UserProfileType}) {
    let props = {
      profile: state.profile
    }
    return(props);
  },
  function mapDispatchToProps(dispatch: Dispatch) {
    return {
      set_form_config: (config_base, config_key) => {
        dispatch(setFormLocal(config_base, config_key))
      },
      create_new_form_state: (state_key) => {
        dispatch(createNewFormState(state_key))
      },
      set_form_state_errors: (state_key, errors) => {
        dispatch(setFormStateErrors(state_key, errors))
      }
    }
  }
)(LoginForm);
export default LoginFormContainer;


