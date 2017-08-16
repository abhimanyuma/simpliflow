import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { push } from 'react-router-redux'
import { setOrganisationErrors } from './OrganisationActions.js'


const SET_LOADED =  'Role::SetLoadedModel';
export function setLoadedModel(org_slug, role_slug): {type: string, role_slug: string} {
  return {
    type: SET_LOADED,
    role_slug: role_slug,
    org_slug: org_slug
  }
}

const SET_LOADING =  'Role::SetLoadingModel';
export function setLoadingModel(org_slug, role_slug): {type: string, role_slug: string} {
  return {
    type: SET_LOADING,
    role_slug: role_slug,
    org_slug: org_slug
  }
}

const SET_ROLES =  'Role::SetMultiple';
export function setRoles(roles) {
  return {
    type: SET_ROLES,
    data: roles
  }
}


const SET_ROLE = 'Role::Set';
export function setRole(role: Object): {type: string, data: Object} {
  return {
    type: SET_ROLE,
    data: role
  }
}

const REMOVE_ROLE = 'Role::Remove';
export function removeRole(org_slug: string, role_slug: string): {type: string, org_slug: string} {
  return {
    type: REMOVE_ROLE,
    org_slug: org_slug,
    role_slug: role_slug
  }
}

const SET_ROLE_ERRORS =  'Role::SetErrors';
export function setRoleErrors(org_slug: string, role_slug: string, errors: Object): {type: string, errors: Object} {
  return {
    type: SET_ROLE_ERRORS,
    errors: errors,
    role_slug: role_slug,
    org_slug: org_slug
  }
}


export function getOrganisationRoles(org_slug: string): Function {
  return function(dispatch) {
    let url = `/organisations/${org_slug}/roles`;
    let success_cb = (data) => {
      dispatch(setRoles(data));
    }
    let error_cb = (errors) => {
      dispatch(setOrganisationErrors(org_slug, errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}

export function getRole(org_slug: string, role_slug: string): Function {
  return function(dispatch) {
    let url = `/organisations/${org_slug}/roles/${role_slug}`;
    let success_cb = (data) => {
      dispatch(setRole(data));
    }
    let error_cb = (errors) => {
      dispatch(setRoleErrors(org_slug, role_slug, errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}

export function createRole(role_name, org_slug, redirect): Function {
  return function(dispatch) {
    let url = `/organisations/${org_slug}/roles`;
    let success_cb = (data) => {
      dispatch(setRole(data))
      if (redirect !== null) {
        dispatch(push(redirect(org_slug, data["slug"])))
      }
    }
    let error_cb = (errors) => {
      console.log(errors)
    }
    let data = {
      "role": {
        "name": role_name
      }
    }
    create_object(url, data, success_cb, error_cb)
  }
}

export function updateRole(role, data): Function {
  return function(dispatch) {
    role.update(data, dispatch)
  }

}

export function deleteRole(org_slug: string, role_slug: string, redirect): Function {
  return function(dispatch) {
    dispatch(setLoadingModel(org_slug, role_slug))
    let url = `/organisations/${org_slug}/roles/${role_slug}`;
    let success_cb = (data) => {
      dispatch(removeRole(org_slug, role_slug));
      if (redirect !== null) {
        dispatch(push(redirect(org_slug)))
      }
    }
    let error_cb = (errors) => {
      dispatch(setLoadedModel(org_slug, role_slug))
      dispatch(setRoleErrors(org_slug, role_slug, errors));
    }
    delete_object(url, success_cb, error_cb);
  }

}


