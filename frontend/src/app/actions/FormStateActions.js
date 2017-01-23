// @flow
// TODO: Add a dispatch function type
import { fetch_object, create_object, delete_object } from '../common/utils.js'
import { validate } from '../common/validator.js'

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
