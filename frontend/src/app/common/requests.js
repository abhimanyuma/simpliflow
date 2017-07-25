 // TODO: Change from object type
import { get_full_url, add_nonce } from './utils.js';
import { get_auth_token } from './authentication.js';

export function process_response(request: Object): [number, boolean, Array<number>] {
  let http_status = request.status;
  if (!(request.response)) {
    return([http_status, false, []]);
  }
  let full_response = JSON.parse(request.response);
  let status = full_response["status"] || false;
  if(status == true) {
    let data = full_response["data"];
    return([http_status, status, data ]);
  } else {
    let errors = full_response["errors"];
    return([http_status, status, errors]);
  }
}

function http_code_kind(code: number | string):string  {
  let code_num: number = parseInt(code)
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


function ajax_request(method: string, url: string, options: Object): void {
  let full_url: string = get_full_url(url);
  full_url = add_nonce(full_url)
  let req = new XMLHttpRequest();
  req.addEventListener("load", (event) => {
    let [http_status, status, response] = process_response(req);
    if((http_code_kind(req.status) == "SUCCESS") && options.success_cb) {
      options.success_cb(response, status, http_status);
    } else if(options.error_cb) {
      options.error_cb(response, status, http_status);
    }
  });
  req.addEventListener("error", (event) => {
    let http_status = null;
    let status = null;
    let errors = {"global":["The connection has timed out"]};
    if(options.error_cb) {
      options.error_cb(errors, status, http_status);
    };
  })



  if (method == "FILE_PUT") {
    req.open("PUT", full_url)
    req.setRequestHeader("Content-Type", "multipart/form-data");
    req.setRequestHeader("X-File-Name", options.file.name);
    req.setRequestHeader("X-File-Size", options.file.size);
    req.setRequestHeader("X-File-Type", options.file.type);
  } else {
    req.open(method, full_url);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  }

  req.setRequestHeader("Authorization", get_auth_token());

  if (method == "FILE_PUT") {
    let formData = new FormData();
    formData.append(options.file_attribute, options.file)
    req.send(formData)
  } else if(options.data) {
    req.send(JSON.stringify(options.data));
  } else {
    req.send();
  }
  //r.open("GET",url)
}

export function fetch_object(url: string, success_cb: Function, error_cb: Function) {
  let options = {
    success_cb: success_cb,
    error_cb: error_cb
  };
  ajax_request("GET", url, options);
}

export function create_object(url: string, data: Object, success_cb: Function, error_cb: Function) {
  let options = {
    success_cb: success_cb,
    error_cb: error_cb,
    data: data
  };
  ajax_request("POST", url, options);
}

export function delete_object(url: string, success_cb: Function, error_cb: Function)  {
  let options = {
    success_cb: success_cb,
    error_cb: error_cb,
  };
  ajax_request("DELETE", url, options);
}

export function upload_file(url: string, file: Object, success_cb: Function, error_cb: Function, additional_options)  {
  let options = {
    success_cb: success_cb,
    error_cb: error_cb,
    file: file,
    file_attribute: additional_options.file_attribute
  };
  ajax_request("FILE_PUT", url, options);
}

export function update_object(url: string, data: Object, success_cb: Function, error_cb: Function) {
  let options = {
    success_cb: success_cb,
    error_cb: error_cb,
    data: data
  };
  ajax_request("PUT", url, options);
}