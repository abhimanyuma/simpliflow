//@flow

import React from 'react';
import { connect } from 'react-redux';

import OrganisationTeams from './OrganisationTeams.jsx';

import {getOrganisationTeams} from '../../../actions/TeamActions.js';
import {getOrganisation} from '../../../actions/OrganisationActions.js';


let OrganisationTeamsContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug

    if (org_slug) {
      response["org_slug"] = org_slug
    }

    if (org_slug && state.organisations && state.organisations.get_model(org_slug)) {
      response["organisation"] = state.organisations.get_model(org_slug)
      if (response["organisation"]) {
        if (state.teams) {
          response["teams"] = state.teams.get_org_teams(org_slug)
        }
      }
    }



    response["organisations"] = state.organisations

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_teams: (additional_attributes = {}) => {
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        dispatch(getOrganisation(org_slug))
        dispatch(getOrganisationTeams(org_slug))
      }
    })

  }
)(OrganisationTeams);
export default OrganisationTeamsContainer;

