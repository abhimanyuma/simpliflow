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

export function fetch_object(url, success_cb, error_cb) {
    let full_url = get_full_url(url);
    let req = new XMLHttpRequest();
    req.addEventListener("load", (event) => {
        let [http_status, status, response] = process_response(req);
        if(req.status == 200) {
            success_cb(response, status, http_status);
        } else {
            error_cb(response, status, http_status);
        }
    });
    req.addEventListener("error", (event) => {
        let http_status = null;
        let status = null;
        let errors = ["The connection has timed out"];
        error_cb(http_status, status, errors);
    })
    req.open("GET", full_url);
    req.setRequestHeader("Authorization", get_auth_token());
    req.send();
    //r.open("GET",url)
}