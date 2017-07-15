import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { push } from 'react-router-redux'
import { setOrganisationErrors } from './OrganisationActions.js'


const SET_LOADED =  'Team::SetLoadedModel';
export function setLoadedModel(org_slug, team_slug): {type: string, team_slug: string} {
  return {
    type: SET_LOADED,
    team_slug: team_slug,
    org_slug: org_slug
  }
}

const SET_LOADING =  'Team::SetLoadingModel';
export function setLoadingModel(org_slug, team_slug): {type: string, team_slug: string} {
  return {
    type: SET_LOADING,
    team_slug: team_slug,
    org_slug: org_slug
  }
}

const SET_TEAMS =  'Team::SetMultiple';
export function setTeams(teams) {
  return {
    type: SET_TEAMS,
    data: teams
  }
}

// const REQUEST_ORG = 'Organisation::Request';
// export function requestOrganisation(org_slug: string, refresh: boolean = true): {type: string, refresh: boolean} {
//   return {
//     type: REQUEST_ORG,
//     refresh: refresh,
//     org_slug: org_slug
//   }
// }

const SET_TEAM = 'Team::Set';
export function setTeam(team: Object): {type: string, data: Object} {
  return {
    type: SET_TEAM,
    data: team
  }
}

const REMOVE_TEAM = 'Team::Remove';
export function removeTeam(org_slug: string, team_slug: string): {type: string, org_slug: string} {
  return {
    type: REMOVE_TEAM,
    org_slug: org_slug,
    team_slug: team_slug
  }
}

const SET_TEAM_ERRORS =  'Team::SetErrors';
export function setTeamErrors(org_slug: string, team_slug: string, errors: Object): {type: string, errors: Object} {
  return {
    type: SET_TEAM_ERRORS,
    errors: errors,
    team_slug: team_slug,
    org_slug: org_slug
  }
}


export function getOrganisationTeams(org_slug: string): Function {
  return function(dispatch) {
    let url = `/organisations/${org_slug}/teams`;
    let success_cb = (data) => {
      dispatch(setTeams(data));
    }
    let error_cb = (errors) => {
      dispatch(setOrganisationErrors(org_slug, errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}

export function getTeam(org_slug: string, team_slug: string): Function {
  return function(dispatch) {
    let url = `/organisations/${org_slug}/teams/${team_slug}`;
    let success_cb = (data) => {
      dispatch(setTeam(data));
    }
    let error_cb = (errors) => {
      dispatch(setTeamErrors(org_slug, team_slug, errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}

export function createTeam(team_name, org_slug,redirect): Function {
  return function(dispatch) {
    let url = `/organisations/${org_slug}/teams`;
    let success_cb = (data) => {
      dispatch(setTeam(data))
      if (redirect) {
        dispatch(push(redirect(org_slug, data["slug"])))
      }
    }
    let error_cb = (errors) => {
      console.log(errors)
    }
    let data = {
      "team": {
        "name": team_name
      }
    }
    create_object(url, data, success_cb, error_cb)
  }
}

export function updateTeam(team, data): Function {
  return function(dispatch) {
    team.update(data, dispatch)
  }

}

export function deleteTeam(org_slug: string, team_slug: string, redirect): Function {
  return function(dispatch) {
    dispatch(setLoadingModel(org_slug, team_slug))
    let url = `/organisations/${org_slug}/teams/${team_slug}`;
    let success_cb = (data) => {
      dispatch(removeTeam(org_slug, team_slug));
      if (redirect !== null) {
        dispatch(push(redirect(org_slug)))
      }
    }
    let error_cb = (errors) => {
      dispatch(setLoadedModel(org_slug, team_slug))
      dispatch(setTeamErrors(org_slug, team_slug, errors));
    }
    delete_object(url, success_cb, error_cb);
  }

}


