//@flow

import React from 'react';
import { connect } from 'react-redux';

import Forms from './Forms.jsx';

import {getForms} from '../../../actions/FormActions.js';

let FormsContainer  = connect(
  function mapStateToProps(state) {
    return {
      profile: state.profile,
      forms: state.forms.get_global_forms(),
    }
  },
  function mapDispatchToProps(dispatch) {
    return ({
      get_forms: () => {
        dispatch(getForms())
      }
    });
  }
)(Forms);
export default FormsContainer;

