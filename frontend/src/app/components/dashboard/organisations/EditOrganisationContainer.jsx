//@flow

import React from 'react';
import { connect } from 'react-redux';

import EditOrganisation from './EditOrganisation.jsx';

import {getOrganisation} from '../../../actions/OrganisationActions.js';



let EditOrganisationContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug

    if (org_slug) {
      response["org_slug"] = org_slug
    }

    if (org_slug && state.organisations && state.organisations.get_model(org_slug)) {
      response["organisation"] = state.organisations.get_model(org_slug)
    }

    response["organisations"] = state.organisations

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_org: () => {
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        dispatch(getOrganisation(org_slug))
      }
    })

  }
)(EditOrganisation);
export default EditOrganisationContainer;

