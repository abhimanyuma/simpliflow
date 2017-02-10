// @flow
// TODO: Add a dispatch function type
import { fetch_object, create_object, delete_object } from '../common/common.js'
import { validate } from '../common/common.js'

const SET_FORM_STATE = "FormState::Set"
export function setFormState(id: ?string, data: any = {}) {
  return ({
    type: SET_FORM_STATE,
    id: id,
    data: data
  });
}

export function createNewFormState(id: ?string) {
  return(setFormState(id, {}))
}

const UPDATE_FORM_STATE = "FormState::Update"
export function updateFormState(id: string, additional_data: Object) {
  return({
    type: UPDATE_FORM_STATE,
    id: id,
    data: additional_data
  });
}

const SET_ERROR_STATE = "FormState::SetErrors"
export function checkFormStateErrors(form_state, form_config, state_id) {
  let total_validation_rules = []
  let elements = form_config.get("elements");

  for (let element of elements) {

    let default_field = null;
    if (element["variable"] && element["variable"].length == 1) {
      default_field = element["variable"]
    }

    if (element["validation_rules"]) {
      for (let validation_rule of element["validation_rules"]) {
        if (validation_rule["variable"]) {
          total_validation_rules.push(Object.assign({}, validation_rule))
        } else if (default_field) {
          let rule = Object.assign({}, validation_rule)
          rule["variable"] = default_field
          total_validation_rules.push(rule);
        }
      }
    }
  }

  let global_validation_rules = form_config.get("validation_rules")
  if (global_validation_rules) {
    for (let global_rule of global_validation_rules) {
      total_validation_rules.push(Object.assign({}, global_rule))
    }
  }

  let error_values = validate(form_state, total_validation_rules)
  return({
    type: SET_ERROR_STATE,
    id: state_id,
    errors: error_values,
  });

}
