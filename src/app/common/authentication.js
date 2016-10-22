function set_auth_token(auth_token) {
  window.user_auth_token = auth_token;
}

export function get_auth_token() {
  let auth_token = window.user_auth_token || null;
  return(auth_token);
}

export function set_auth_from_user(user) {
  if(user.get("authentication_token")) {
    set_auth_token(user.get("authentication_token"));
  } else {
    set_auth_token(null);
  }
}