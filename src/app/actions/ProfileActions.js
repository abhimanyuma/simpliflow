import { fetch_object, create_object } from '../common/utils.js'

const REQUEST_PROFILE = 'Profile::Response';

export function requestProfile(refresh = false) {
  return {
    type: REQUEST_PROFILE,
    refresh: false    
  }
}

const SET_PROFILE = 'Profile::Set';
export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    data: profile
  }
}

export function fetchProfile(profile) {
  return function(dispatch) {
    dispatch(requestProfile(profile));
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
export function loginUser(username, password) {
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
    console.log(data);
    create_object(url, data, success_cb,error_cb);
  }
}
