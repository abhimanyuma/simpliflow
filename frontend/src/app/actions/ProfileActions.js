// @flow
// TODO: Add a dispatch function type
import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { validate } from '../common/common.js'
import { setFormStateErrors } from './FormStateActions.js';

const REQUEST_PROFILE = 'Profile::Response';
export function requestProfile(refresh: boolean = false): {type: string, refresh: boolean} {
  return {
    type: REQUEST_PROFILE,
    refresh: false
  }
}

const SET_PROFILE = 'Profile::Set';
export function setProfile(profile: Object): {type: string, data: Object} {
  return {
    type: SET_PROFILE,
    data: profile
  }
}

const SET_PROFILE_ERROR =  'Profile::SetErrors';
export function setProfileErrors(errors: Object): {type: string, errors: Object} {
  return {
    type: SET_PROFILE_ERROR,
    errors: errors
  }
}

const SET_LOADED =  'Profile::SetLoaded';
export function setLoaded(): {type: string} {
  return {
    type: SET_LOADED
  }
}

const SET_LOADING =  'Profile::SetLoading';
export function setLoading(): {type: string} {
  return {
    type: SET_LOADING
  }
}

const UNSET_PROFILE = 'Profile::Unset';
export function unsetProfile(): {type: string} {
  return {
    type: UNSET_PROFILE
  }
}

const UNSET_PROFILE_ERROR = 'Profile::UnsetErrors';
export function unsetProfileErrors(): {type: string} {
  return {
    type: UNSET_PROFILE_ERROR
  }
}

const LOGOUT_PROFILE = 'Profile::Logout'
export function logoutCurrentProfile(profile: Object): Function {
 return function(dispatch) {
    dispatch(requestProfile());
    let url = `/sessions/${profile.get('auth_token')}`;
    let success_cb = (data) => {
      dispatch(unsetProfile(data));
    }
    let error_cb = (errors) => {
      console.log(errors);
    }
    delete_object(url, null, success_cb, error_cb);
  }
}

export function fetchProfile(): Function {
  return function(dispatch) {
    dispatch(requestProfile());
    let url = "/users/me";
    let success_cb = (data) => {
      dispatch(setProfile(data));
    }
    let error_cb = (errors) => {
      dispatch(setLoaded())
      dispatch(setProfileErrors(errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}

const LOGIN_PROFILE = "Profile::Login"
export function loginUser(username: string, password: string): Function {
  return function(dispatch) {
    dispatch(requestProfile());
    dispatch(unsetProfileErrors());
    let url = "/sessions";
    let success_cb = (data) => {
      dispatch(setProfile(data));
    }
    let error_cb = (errors) => {
      dispatch(setLoaded())
      dispatch(setProfileErrors(errors));
    }
    let data = {
      "user": {
        "user_id": username,
        "password": password
      }
    }
    create_object(url, data, success_cb, error_cb);
  }
}

const CREATE_PROFILE = "Profile::Create"
export function createUser(data: Object, form_state_key: String): Function {
  return function(dispatch) {
    let url = "/users";
    let success_cb = (data) => {
      dispatch(setProfile(data));
    }
    let error_cb = (errors) => {
      dispatch(setFormStateErrors(form_state_key, errors));
    }
    let submit_data = {
      "user": data
    }
    create_object(url, submit_data, success_cb, error_cb);

  }
}

export function updateUser(data: Object): Function {
  return function(dispatch) {
    dispatch(setLoading())
    let url = "/users/me";
    let success_cb = (data) => {
      dispatch(setProfile(data));
    }
    let error_cb = (errors) => {
      dispatch(setLoaded())
      dispatch(setProfileErrors(errors));
    }

    let new_data = {"user": data}

    update_object(url, new_data, success_cb, error_cb);
  }
}


