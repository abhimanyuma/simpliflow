import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'

const SET_LOADED =  'Organisation::SetLoadedModel';
export function setLoadedModel(org_slug): {type: string, org_slug: string} {
  return {
    type: SET_LOADED,
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

const SET_ORG_ERRORS =  'Organisation::SetErrors';
export function setOrganisationErrors(org_slug: string, errors: Object): {type: string, errors: Object} {
  return {
    type: SET_ORG_ERRORS,
    errors: errors,
    org_slug: org_slug
  }
}


export function getOrganisation(org_slug: string): Function {
  return function(dispatch) {
    console.log("I am here")
    dispatch(requestOrganisation());
    let url = `/organisations/${org_slug}`;
    let success_cb = (data) => {
      dispatch(setOrganisation(data));
    }
    let error_cb = (errors) => {
      dispatch(setLoaded(org_slug))
      dispatch(setOrganisationErrors(org_slug, errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}

