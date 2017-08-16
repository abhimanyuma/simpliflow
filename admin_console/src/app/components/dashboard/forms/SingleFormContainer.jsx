//@flow

import React from 'react';
import { connect } from 'react-redux';

import SingleForm from './SingleForm.jsx';

import {getForm} from '../../../actions/FormActions.js';



let SingleFormContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let form_id = ownProps.form_id || ownProps.routeParams.form_id

    if (form_id) {
      response["form_id"] = form_id
    }

    if (form_id && state.forms && state.forms.get_model) {
      response["form"] = state.forms.get_model(form_id)
    }

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_form: () => {
        let form_id = ownProps.form_id || ownProps.routeParams.form_id
        dispatch(getForm(form_id))
      }
    })

  }
)(SingleForm);
export default SingleFormContainer;

