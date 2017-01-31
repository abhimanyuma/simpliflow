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
