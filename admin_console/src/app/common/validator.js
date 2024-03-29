// @flox

import ModelActions from './ModelActions.js';
import { fetch_object } from './requests.js';

let regex: {[id:string]: RegExp } = {
  "username": /^\w*$/,
  "email": /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
}

let regex_errors: {[id:string]: string} = {
  "username": "should contain only alphabets, digits and underscore",
  "email": "should be a valid email id"
}

function validate_presence(value: string|number): ?string {
  if (value) {
    return null
  } else {
    return "must be present"
  }
}

function validate_min_length(value: string, min_length: number): ?string {
  if (!value || !value.length) {
    return 'must be present'
  } else if (value.length < min_length) {
    return `has to be atleast ${min_length} characters long`
  } else {
    return null
  }
}

function validate_max_length(value: string, max_length: number): ?string {
  if (!value || !value.length) {
    return null
  } else if ((!value.length) || (value.length > max_length)) {
    return `has to be shorter than ${min_length} characters`
  } else {
    return null
  }
}

function validate_equality(value: string, comparison_variable: string, form_state ): ?string {
  let comparable_value = form_state.get_data(comparison_variable)
  if (value !== comparable_value){
    return `has to be equal to ${comparison_variable}`
  }
}

function validate_likeness(value: string, regex_key: string): ?string {
  let operation = null
  let values: Array<string> = []
  let errors: Array<string> = []
  let error: ?string = null
  if (!value) {
    value = ""
  }
  if (regex_key.indexOf("_or_") > -1) {
    values = regex_key.split("_or_")
    operation = "or"
  } else if (regex_key.indexOf("_and_") > -1 ) {
    values = regex_key.split("_and_")
    operation = "and"
  } else {
    values = [regex_key]
  }

  let flag: boolean = true

  if ((operation === "or") && (values.length > 0)) {
    flag = false
  }

  for (var regex_value of values) {
    if (!regex[regex_value].test(value)) {
      errors.push(regex_errors[regex_value])
      if ( operation === "and" ) {
        flag = flag && false
      }
    } else {
      if ( operation === "or" ) {
        flag = flag || true
      }
    }
  }

  if (operation && !flag) {
    error = errors.join(` ${operation} `)
  } else if ((errors.length > 0) && !flag) {
    error = errors[0]
  } else {
    error = null
  }

  return(error)
}

export function validate(form_state, rules) {
  let errors: Object = {}
  let single: boolean = false
  let field_name = null;
  let field_value = null;
  for (let rule of rules) {
    if (rule["variable"]) {
      if (rule["variable"].length && rule["variable"].length === 1) {
        field_name = rule["variable"][0];
        single = true;
        field_value = form_state.get_data(field_name)
      } else if (rule["variable"].length > 1) {
        field_name = rule["variable"]
        field_value = form_state.multi_get_data(field_name)
      } else if (form_state.get(rule["variable"])) {
        field_name = rule["variable"]
        field_value = form_state.get_data(field_name)
      }
      let cur_error = validate_individual(field_name, field_value, rule, form_state)
      if (cur_error && single) {
        if (!errors[field_name]) {
          errors[field_name] = []
        }
        errors[field_name].push(`${field_name} ${cur_error}`)
      } else if (cur_error) {
        if (!errors["global"]) {
          errors["global"] = []
        }
        errors["global"].push(cur_error)
      }
    }
  }
  return(errors);
}

export function async_validate(
  field_name: string,
  field_value: any,
  url: string,
  variable: string,
  success_cb: Function,
  error_cb: Function
) {
  let full_request = `${url}/validate?${variable}=${field_value}`
  fetch_object(full_request, success_cb, error_cb)

}

function validate_individual (
  field_name: string,
  field_value: any,
  rule: Object,
  form_state: Object
  )  {

  let error: ?string = null
  switch (rule["type"]) {
    case "presence":
      error = validate_presence(field_value);
      break;
    case "min_length":
      error = validate_min_length(field_value, rule["parameter"], form_state);
      break;
    case "max_length":
      error = validate_max_length(field_value, rule["parameter"], form_state);
      break;
    case "like":
      error = validate_likeness(field_value, rule["parameter"], form_state);
      break;
    case "equality":
      error = validate_equality(field_value, rule["parameter"], form_state);
      break;
    default:
      error = null
  }

  return error
}
