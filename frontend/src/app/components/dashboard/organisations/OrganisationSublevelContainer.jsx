//@flow

import React from 'react';
import { connect } from 'react-redux';

import OrganisationSublevel from './OrganisationSublevel.jsx';

import {getOrganisationTeams} from '../../../actions/TeamActions.js';
import {getOrganisationRoles} from '../../../actions/RoleActions.js';

import {getOrganisation} from '../../../actions/OrganisationActions.js';


let OrganisationSublevelContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}

    let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
    let type = ownProps.elem || ownProps.routeParams.elem

    if (org_slug) {
      response["org_slug"] = org_slug
    }

    response["type"] = type

    if (org_slug && state.organisations && state.organisations.get_model) {
      response["organisation"] = state.organisations.get_model(org_slug)
      if (response["organisation"]) {
        if (state.teams && (type == "teams")) {
          response["sublevels"] = state.teams.get_org_teams(org_slug)
        } else if (state.roles && (type == "roles")) {
          response["sublevels"] = state.roles.get_org_roles(org_slug)
        }
      }
    }

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_sublevels: () => {
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        dispatch(getOrganisation(org_slug))
        let type = ownProps.elem || ownProps.routeParams.elem

        if (type == "teams") {
          dispatch(getOrganisationTeams(org_slug))
        } else if (type == "roles") {
          dispatch(getOrganisationRoles(org_slug))
        }
      }
    })

  }
)(OrganisationSublevel);
export default OrganisationSublevelContainer;

