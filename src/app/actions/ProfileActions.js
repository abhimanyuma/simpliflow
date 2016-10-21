import { fetch_object } from '../common/utils.js'

export const REQUEST_PROFILE = 'Profile::Response';

export function requestProfile(refresh = false) {
  return {
    type: REQUEST_PROFILE,
    refresh: false    
  }
}

export const SET_PROFILE = 'Profile::Set';
export function setProfile(profile) {
  console.log("Atleast here");
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
      console.log("Ding dong");
      dispatch(setProfile(data));
    }
    let error_cb = (errors) => {
      console.log(errors);
    }
    fetch_object(url,success_cb,error_cb);
  }
  
}
