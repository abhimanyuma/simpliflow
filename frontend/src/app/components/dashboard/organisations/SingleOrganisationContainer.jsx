//@flow

import React from 'react';
import { connect } from 'react-redux';

import SingleOrganisation from './SingleOrganisation.jsx';

import {getOrganisation} from '../../../actions/OrganisationActions.js';



let SingleOrganisationContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug

    if (org_slug) {
      response["org_slug"] = org_slug
    }

    if (org_slug && state.organiations && state.organisations.get(ownProps.org_slug)) {
      response["organisation"] = state.organisations.get(ownProps.org_slug)
    }

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_org: () => {
        console.log("This is called")
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        dispatch(getOrganisation(org_slug))
      }
    })

  }
)(SingleOrganisation);
export default SingleOrganisationContainer;

