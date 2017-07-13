//@flow

import React from 'react';
import { connect } from 'react-redux';

import DeleteTeam from './DeleteTeam.jsx';

import {getTeam} from '../../../actions/TeamActions.js';

import { deleteTeam } from '../../../actions/TeamActions.js';

import * as URL from '../../../common/url.js';



let DeleteTeamContainer = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}
    let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
    let team_slug = ownProps.team_slug || ownProps.routeParams.team_slug

    if (org_slug) {
      response["org_slug"] = org_slug
    }

    if (team_slug) {
      response["team_slug"] = team_slug
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
      },
      on_delete_confirmation: (org_slug, team_slug) => {
        dispatch(deleteTeam(org_slug, team_slug, URL.Team.default_root(org_slug) ))
      }
    });
  }
)(DeleteTeam);
export default DeleteTeamContainer;

