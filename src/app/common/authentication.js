import { set_cookie, get_cookie, delete_cookie } from './cookies.js';

function set_auth_token(auth_token) {
  window.user_auth_token = auth_token;
  if (auth_token) {
    set_cookie('auth_token', auth_token, null);
  } else {
    delete_cookie('auth_token');
  }
}

export function get_auth_token() {
  let auth_token = window.user_auth_token || get_cookie('auth_token');
  return(auth_token);
}

export function set_auth_from_user(user) {
  if(user.get("auth_token")) {
    set_auth_token(user.get("auth_token"));
  } else {
    set_auth_token(null);
  }
}