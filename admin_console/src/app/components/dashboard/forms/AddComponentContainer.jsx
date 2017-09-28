//@flow

import React from 'react';
import { connect } from 'react-redux';

import AddComponent from './AddComponent.jsx';

import { getComponents } from '../../../actions/ComponentActions.js';
import { addComponent } from '../../../actions/FormActions.js';

let AddComponentContainer  = connect(
  function mapStateToProps(state, ownProps) {
  let response = {"profile": state.profile}

    let form_uuid = ownProps.form_id || ownProps.routeParams.form_id
    response["form"] = state.forms.models.get(ownProps.form_uuid)
    response["components"] =  state.components.models

    if (form_uuid && state.forms && state.forms.get_model) {
      response["form"] = state.forms.get_model(form_uuid)
    }

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_components() {
        dispatch(getComponents())
      },
      add_new_component(id) {
        let form_uuid = ownProps.form_id || ownProps.routeParams.form_id
        dispatch(addComponent(form_uuid, id))
      }


    });
  }
)(AddComponent);
export default AddComponentContainer;

