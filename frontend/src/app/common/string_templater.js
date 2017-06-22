export function hydrate_string(string_template, variable_object, undefined_string = "undefined") {
  let reg_ex = RegExp(/:\w+/, "g")
  let variables_with_colon = string_template.match(reg_ex)
  let variables = variables_with_colon.map(x => {return x.match(/\w+/)[0]})
  for (let variable of variables) {
    if (variable_object[variable]) {
      string_template = string_template.replace(`:${variable}`, variable_object[variable])
    } else {
      string_template = string_template.replace(`:${variable}`, undefined_string)
    }
  }

  return string_template
}