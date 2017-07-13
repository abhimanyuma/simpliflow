//@flow

import React from 'react';
import { connect } from 'react-redux';

import SingleTeam from './SingleTeam.jsx';

import {getTeam} from '../../../actions/TeamActions.js';



let SingleTeamContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
    let team_slug = ownProps.team_slug || ownProps.routeParams.team_slug

    if (org_slug) {
      response["org_slug"] = org_slug
    }

    if (team_slug) {
      response["team_slug"] = org_slug
    }

    if (team_slug && state.teams && state.teams.get_model) {
      response["team"] = state.teams.get_model(`${org_slug}/${team_slug}`)
    }

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_team: () => {
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        let team_slug = ownProps.team_slug || ownProps.routeParams.team_slug
        dispatch(getTeam(org_slug, team_slug))
      }
    })

  }
)(SingleTeam);
export default SingleTeamContainer;

