//@flow

import React from 'react';
import { connect } from 'react-redux';

import SingleSublevel from './SingleSublevel.jsx';

import {getTeam} from '../../../actions/TeamActions.js';
import {getRole} from '../../../actions/RoleActions.js';

let SingleSublevelContainer  = connect(
  function mapStateToProps(state, ownProps) {
    let response = {"profile": state.profile}

    let org_slug = ownProps.routeParams.org_slug || ownProps.org_slug
    let sublevel_slug = ownProps.routeParams.sublevel_slug || ownProps.team_slug || ownProps.role_slug
    let type = ownProps.route.type || ownProps.type

    response["org_slug"] = org_slug
    response["sublevel_slug"] = sublevel_slug
    response["type"] = type


    if (sublevel_slug) {
      if (type == "teams" && state.teams && state.teams.get_model) {
        response["sublevel"] = state.teams.get_model(`${org_slug}/${sublevel_slug}`)
      } else if (type == "roles" && state.roles && state.roles.get_model) {
        response["sublevel"] = state.roles.get_model(`${org_slug}/${sublevel_slug}`)
      }
    }

    return response
  },
  function mapDispatchToProps(dispatch, ownProps) {
    return ({
      get_sublevel: () => {
        let org_slug = ownProps.org_slug || ownProps.routeParams.org_slug
        let sublevel_slug = ownProps.routeParams.sublevel_slug || ownProps.team_slug || ownProps.role_slug
        let type = ownProps.route.type || ownProps.type

        if (type == "teams") {
          dispatch(getTeam(org_slug, sublevel_slug))
        } else if (type == "roles") {
          dispatch(getRole(org_slug, sublevel_slug))
        }
      }
    })

  }
)(SingleSublevel);
export default SingleSublevelContainer;

