import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'

const SET_LOADED =  'UserOrganisation::SetLoaded';
export function setLoaded(): {type: string} {
  return {
    type: SET_LOADED
  }
}

const REQUEST_USERORGS = 'UserOrganisation::Request';
export function requestUserOrganisations(refresh: boolean = true): {type: string, refresh: boolean} {
  return {
    type: REQUEST_USERORGS,
    refresh: refresh
  }
}

const SET_USERORGS = 'UserOrganisation::Set';
export function setUserOrganisations(user_orgs: Object): {type: string, data: Object} {
  return {
    type: SET_USERORGS,
    data: user_orgs
  }
}

const SET_USERORG_ERRORS =  'Profile::SetErrors';
export function setUserOrganisationErrors(errors: Object): {type: string, errors: Object} {
  return {
    type: SET_USERORG_ERRORS,
    errors: errors
  }
}


export function getUserOrganisations(): Function {
  return function(dispatch) {
    dispatch(requestUserOrganisations());
    let url = "/users/me/organisations";
    let success_cb = (data) => {
      dispatch(setUserOrganisations(data));
    }
    let error_cb = (errors) => {
      dispatch(setLoaded())
      dispatch(setUserOrganisationErrors(errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}

export function createOrganisation(org_name): Function {
  return function(dispatch) {
    let url = "/users/me/organisations";
    let success_cb = (data) => {
      dispatch(getUserOrganisations())
    }
    let error_cb = (errors) => {
      console.log(errors)
    }
    let data = {
      "organisation": {
        "name": org_name
      }
    }
    create_object(url, data, success_cb, error_cb)
  }
}

