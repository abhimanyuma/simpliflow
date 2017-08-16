import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { push } from 'react-router-redux'


const SET_LOADED =  'Form::SetLoadedModel';
export function setLoadedModel(form_uuid): {type: string, form_uuid: string} {
  return {
    type: SET_LOADED,
    form_uuid: form_uuid
  }
}

const SET_LOADING =  'Form::SetLoadingModel';
export function setLoadingModel(form_uuid): {type: string, form_uuid: string} {
  return {
    type: SET_LOADING,
    form_uuid: form_uuid
  }
}

const REQUEST_FORM = 'Form::Request';
export function requestForm(form_uuid: string, refresh: boolean = true): {type: string, refresh: boolean} {
  return {
    type: REQUEST_FORM,
    refresh: refresh,
    form_uuid: form_uuid
  }
}

const SET_FORM = 'Form::Set';
export function setForm(form: Object): {type: string, data: Object} {
  return {
    type: SET_FORM,
    data: form
  }
}

const SET_FORMS =  'Form::SetMultiple';
export function setForms(forms) {
  return {
    type: SET_FORMS,
    data: forms
  }
}

const REMOVE_FORM = 'Form::Remove';
export function removeForm(form_uuid: string): {type: string, form_uuid: string} {
  return {
    type: REMOVE_ORG,
    form_uuid: form_uuid
  }
}

const SET_FORM_ERRORS =  'Form::SetErrors';
export function setFormErrors(form_uuid: string, errors: Object): {type: string, errors: Object} {
  return {
    type: SET_ORG_ERRORS,
    errors: errors,
    form_uuid: form_uuid
  }
}


export function getForms(): Function {
  return function(dispatch) {
    let url = `/forms`;
    let success_cb = (data) => {
      dispatch(setForms(data));
    }
    let error_cb = (errors) => {
      console.log(errors)
    }
    fetch_object(url, success_cb, error_cb);
  }

}

export function getForm(form_uuid: string, additional_attribs = {}): Function {
  return function(dispatch) {
    dispatch(requestForm(form_uuid));
    let url = `/forms/${form_uuid}`;
    let success_cb = (data) => {
      dispatch(setForm(data));
    }
    let error_cb = (errors) => {
      dispatch(setLoadedModel(form_uuid))
      dispatch(setFormErrors(form_uuid, errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}


const CREATE_FORM_CONFIG = 'Form::SetLocal';
export function setFormLocal(config: any, id: string, reset: boolean = true) {
  let response = {
    type: CREATE_FORM_CONFIG,
    data: config,
    reset: reset,
    id: id
  };
  return response
}

