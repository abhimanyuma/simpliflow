//@flow

import React from 'react';
import { connect } from 'react-redux';

import DeleteOrganisation from './DeleteOrganisation.jsx';

import {getOrganisation} from '../../../actions/OrganisationActions.js';

import { deleteOrganisation } from '../../../actions/OrganisationActions.js';

import * as URL from '../../../common/url.js';



let DeleteOrganisationContainer  = connect(
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
      },
      on_delete_confirmation: (org_slug) => {
        dispatch(deleteOrganisation(org_slug, URL.Organisation.default_root() ))
      }
    });
  }
)(DeleteOrganisation);
export default DeleteOrganisationContainer;

