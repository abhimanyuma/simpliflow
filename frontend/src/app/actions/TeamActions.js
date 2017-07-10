import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { push } from 'react-router-redux'
import { setOrganisationErrors } from './OrganisationActions.js'


const SET_LOADED =  'Team::SetLoadedModel';
export function setLoadedModel(team_slug): {type: string, team_slug: string} {
  return {
    type: SET_LOADED,
    team_slug: team_slug
  }
}

const SET_LOADING =  'Team::SetLoadingModel';
export function setLoadingModel(team_slug): {type: string, team_slug: string} {
  return {
    type: SET_LOADING,
    team_slug: team_slug
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

// const SET_ORG = 'Organisation::Set';
// export function setOrganisation(org: Object): {type: string, data: Object} {
//   return {
//     type: SET_ORG,
//     data: org
//   }
// }

// const REMOVE_ORG = 'Organisation::Remove';
// export function removeOrganisation(org_slug: string): {type: string, org_slug: string} {
//   return {
//     type: REMOVE_ORG,
//     org_slug: org_slug
//   }
// }

// const SET_ORG_ERRORS =  'Organisation::SetErrors';
// export function setOrganisationErrors(org_slug: string, errors: Object): {type: string, errors: Object} {
//   return {
//     type: SET_ORG_ERRORS,
//     errors: errors,
//     org_slug: org_slug
//   }
// }


export function getOrganisationTeams(org_slug: string, additional_attribs = {}): Function {
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

