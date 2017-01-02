// @flox


let regex: {[id:string]: RegExp } = {
  "username": /^\w+$/,
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
  if (value.length < min_length) {
    return `has to be atleast ${min_length} characters long`
  } else {
    return null
  }
}

function validate_max_length(value: string, max_length: number): ?string {
  if (value.length > max_length) {
    return `has to be shorter than ${min_length} characters`
  } else {
    return null
  }
}

function validate_likeness(value: string, regex_key: string): ?string {
  let operation = null
  let values: Array<string> = []
  let errors: Array<string> = []
  let error: ?string = null 
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

export function validate (
  errors: ErrorListType,
  field_name: string,
  field_value: any,
  rule: string,
  rule_variable: any
  ): ErrorListType {

  let error: ?string = null
  switch (rule) {
    case "presence": 
      error = validate_presence(field_value);
      break;
    case "min_length":
      error = validate_min_length(field_value, rule_variable);
      break;
    case "max_length":
      error = validate_max_length(field_value, rule_variable);
      break;
    case "like":
      error = validate_likeness(field_value, rule_variable);
      break;
    default:
      errror = null
  }

  if (error) {
    if (!(field_name in errors)) {
      errors[field_name] = []
    }
    let full_error: string = `${field_name} ${error}`
    errors[field_name].push(full_error)
  }

  return errors
}
