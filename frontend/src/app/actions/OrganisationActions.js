import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { push } from 'react-router-redux'


const SET_LOADED =  'Organisation::SetLoadedModel';
export function setLoadedModel(org_slug): {type: string, org_slug: string} {
  return {
    type: SET_LOADED,
    org_slug: org_slug
  }
}

const SET_LOADING =  'Organisation::SetLoadingModel';
export function setLoadingModel(org_slug): {type: string, org_slug: string} {
  return {
    type: SET_LOADING,
    org_slug: org_slug
  }
}

const REQUEST_ORG = 'Organisation::Request';
export function requestOrganisation(org_slug: string, refresh: boolean = true): {type: string, refresh: boolean} {
  return {
    type: REQUEST_ORG,
    refresh: refresh,
    org_slug: org_slug
  }
}

const SET_ORG = 'Organisation::Set';
export function setOrganisation(org: Object): {type: string, data: Object} {
  return {
    type: SET_ORG,
    data: org
  }
}

const REMOVE_ORG = 'Organisation::Remove';
export function removeOrganisation(org_slug: string): {type: string, org_slug: string} {
  return {
    type: REMOVE_ORG,
    org_slug: org_slug
  }
}

const SET_ORG_ERRORS =  'Organisation::SetErrors';
export function setOrganisationErrors(org_slug: string, errors: Object): {type: string, errors: Object} {
  return {
    type: SET_ORG_ERRORS,
    errors: errors,
    org_slug: org_slug
  }
}


export function getOrganisation(org_slug: string, additional_attribs = {}): Function {
  return function(dispatch) {
    dispatch(requestOrganisation(org_slug));
    let url = `/organisations/${org_slug}`;
    if (additional_attribs["teams"]) {
      url = `/organisations/${org_slug}/?include_teams=true`;
    }
    let success_cb = (data) => {
      dispatch(setOrganisation(data));
    }
    let error_cb = (errors) => {
      dispatch(setLoadedModel(org_slug))
      dispatch(setOrganisationErrors(org_slug, errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}

export function deleteOrganisation(org_slug: string, redirect_url: string): Function {
  return function(dispatch) {
    dispatch(setLoadingModel(org_slug))
    let url = `/organisations/${org_slug}`;
    let success_cb = (data) => {
      dispatch(removeOrganisation(org_slug));
      if (redirect_url !== null) {
        dispatch(push(redirect_url))
      }
    }
    let error_cb = (errors) => {
      dispatch(setLoadedModel(org_slug))
      dispatch(setOrganisationErrors(org_slug, errors));
    }
    delete_object(url, success_cb, error_cb);
  }

}

export function updateOrganisation(org, data): Function {
  return function(dispatch) {
    org.update(data, dispatch)
  }

}

