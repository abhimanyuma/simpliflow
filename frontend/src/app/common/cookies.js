// @flow

export function set_cookie(name: string | number, value: string | number, days: ?number) {
  let date_string = '';
  if (days) {
    let date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    date_string = date.toUTCString();
  }
  document.cookie = `${name}=${value};expires=${date_string}; path=/`;
}

export function get_cookie(name: string | number) {
  let cookies = document.cookie.split(';');
  for(let cookie of cookies) {
    let [ck_name, ck_value] = cookie.split('=');
    if ((ck_name === name) || (ck_name === ` ${name}`)) {
      return ck_value;
    }
  }
  return null;
}


export function delete_cookie(name: string | number) {
  set_cookie(name,"",-1);
}