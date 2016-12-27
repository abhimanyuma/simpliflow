// @flow
// TODO: Add a dispatch function type
import { fetch_object, create_object, delete_object } from '../common/utils.js'

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

const UNSET_PROFILE = 'Profile::Unset';
export function unsetProfile(): {type: string} {
  return {
    type: UNSET_PROFILE
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
      console.log(errors);
    }
    fetch_object(url, success_cb, error_cb);
  }
  
}

const LOGIN_PROFILE = "Profile::Login"
export function loginUser(username: string, password: string): Function {
  return function(dispatch) {
    dispatch(requestProfile());
    let url = "/sessions";
    let success_cb = (data) => {
      dispatch(setProfile(data));
    }
    let error_cb = (errors) => {
      console.log(errors);
    }
    let data = {
      "user": {
        "user_id": username,
        "password": password
      }
    }
    create_object(url, data, success_cb,error_cb);
  }
}

const CREATE_PROFILE = "Profile::Create"
export function createUser(name: string, password: string, password_confirmation: string, email: string): Function {
  return function(dispatch) {
    let url = "/users";
    let success_cb = (data) => {
      dispatch(setProfile(data));
    }
    let error_cb = (errors) => {
      console.log(errors);
    }
    let data = {
      "user": {
        "name": name,
        "password": password,
        "password_confirmation": password_confirmation,
        "email": email
      }
    }
    let errors = null // validate_user(username, password, password_confirmation, email)

    if (errors) {
      console.log(errors);
    } else {
      create_object(url, data, success_cb, error_cb);
    }
  }
}

