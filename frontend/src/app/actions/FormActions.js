import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { push } from 'react-router-redux'


const SET_LOADED =  'Form::SetLoadedModel';
export function setLoadedModel(form_uuid): {type: string, form_uuid: string} {
  return {
    type: SET_LOADED,
    form_uuid: form_uuid
  }
}

const SET_LOADING =  'Form::SetLoadingModel';
export function setLoadingModel(form_uuid): {type: string, form_uuid: string} {
  return {
    type: SET_LOADING,
    form_uuid: form_uuid
  }
}

const REQUEST_FORM = 'Form::Request';
export function requestForm(form_uuid: string, refresh: boolean = true): {type: string, refresh: boolean} {
  return {
    type: REQUEST_FORM,
    refresh: refresh,
    form_uuid: form_uuid
  }
}

const SET_FORM = 'Form::Set';
export function setForm(form: Object): {type: string, data: Object} {
  return {
    type: SET_FORM,
    data: form
  }
}

const REMOVE_FORM = 'Form::Remove';
export function removeForm(org_slug: string): {type: string, org_slug: string} {
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

export function uploadFileOrganisation(org, file, file_attribute): Function {
  return function(dispatch) {
    org.update(file, dispatch, true, {"file_attribute": file_attribute}) //is_file = true
  }

}

export function removeFileOrganisation(org, file_attribute): Function {
  return function(dispatch) {
    org.remove_file(file_attribute, dispatch) //is_file = true
  }

}

const CREATE_FORM_CONFIG = 'Form::SetLocal';
export function setFormLocal(config: any, id: string, reset: boolean = true) {
  let response = {
    type: CREATE_FORM_CONFIG,
    data: config,
    reset: reset,
    id: id
  };
  return response
}

