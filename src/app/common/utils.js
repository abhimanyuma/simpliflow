import { get_auth_token } from './authentication.js';

function clean(str, character) {
  let clean_str = ""
  let broken = false;
  for (let i = 0, counter=0; i < str.length; i++) {
    if((str[i] !== character) || broken) {
      clean_str += str[i];
      broken = true;
    }
  }
  str = reverse_string(clean_str);
  clean_str = ""
  broken = false
  for (let i = 0; i < str.length; i++) {
    if((str[i] !== character) || broken) {
      clean_str += str[i];
      broken = true;
    }
  }
  return reverse_string(clean_str);

}

export function process_response(request) {
  let http_status = request.status;
  if (!(request.response)) {
    return([http_status, null, null]);
  }
  let full_response = JSON.parse(request.response);
  let status = full_response["status"] || false;
  if(status == true) {
    let data = full_response["data"];
    return([http_status, status, data ]);
  } else {
    let errors = full_response["error"];
    return([http_status, status, errors]);
  }
}

export function reverse_string(str) {
  let reversed_string = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed_string += str[i];
  }
  return reversed_string;
}

export function safe_join() {
  let arg_array = Array.from(arguments);
  let clean_args = arg_array.map(str => clean(str, "/"));
  return clean_args.join("/");
}

export function get_full_url(partial) {
  let host = `api.${window.location.host}`;
  return `${window.location.protocol}//${safe_join(host, partial)}`;
}

function http_code_kind(code) {
  let code_num = parseInt(code)
  if (code_num < 200) {
    return "INFO"
  } else if (code_num < 300) {
    return "SUCCESS"
  } else if (code_num < 400) {
    return "REDIRECT"
  } else if (code_num < 500) {
    return "CLIENT_ERROR"
  } else if (code_num < 600) {
    return "SERVER_ERROR"
  } else {
    return "UNKNOWN_ERROR"
  }
}

function ajax_request(method, url, options) {
  let full_url = get_full_url(url);
  let req = new XMLHttpRequest();
  req.addEventListener("load", (event) => {
    let [http_status, status, response] = process_response(req);
    if((http_code_kind(req.status) == "SUCCESS") && options.success_cb) {
      options.success_cb(response, status, http_status);
    } else if(options.error_cb)  {
      options.error_cb(response, status, http_status);
    }
  });
  req.addEventListener("error", (event) => {
    let http_status = null;
    let status = null;
    let errors = ["The connection has timed out"];
    if(options.error_cb) {
      options.error_cb(http_status, status, errors);
    };
  })
  req.open(method, full_url);
  req.setRequestHeader("Authorization", get_auth_token());
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  if(options.data) {
    req.send(JSON.stringify(options.data));
  } else {
    req.send();
  }
  //r.open("GET",url)
}

export function fetch_object(url, success_cb, error_cb) {
  let options = {
    success_cb: success_cb,
    error_cb: error_cb
  };
  ajax_request("GET", url, options);
}

export function create_object(url, data, success_cb, error_cb) {
  let options = {
    success_cb: success_cb,
    error_cb: error_cb,
    data: data 
  };
  ajax_request("POST", url, options);
}

export function delete_object(url, data, success_cb, error_cb) {
  let options = {
    success_cb: success_cb,
    error_cb: error_cb,
    data: data
  };
  ajax_request("DELETE", url, options);
}
