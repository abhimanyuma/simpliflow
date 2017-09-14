import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { push } from 'react-router-redux'


const SET_LOADED =  'Component::SetLoadedModel';
export function setLoadedModel(id): {type: string, id: string} {
  return {
    type: SET_LOADED,
    id: id
  }
}

const SET_LOADING =  'Component::SetLoadingModel';
export function setLoadingModel(id): {type: string, id: string} {
  return {
    type: SET_LOADING,
    id: id
  }
}

const REQUEST_COMPONENT = 'Component::Request';
export function requestComponent(id: string, refresh: boolean = true): {type: string, refresh: boolean} {
  return {
    type: REQUEST_COMPONENT,
    refresh: refresh,
    id: id
  }
}

const SET_COMPONENT_ERRORS =  'Component::SetErrors';
export function setComponentErrors(id: string, errors: Object): {type: string, errors: Object} {
  return {
    type: SET_COMPONENT_ERRORS,
    errors: errors,
    id: id
  }
}


const SET_COMPONENT = 'Component::Set';
export function setComponent(component: Object): {type: string, data: Object} {
  return {
    type: SET_COMPONENT,
    data: component
  }
}

const SET_COMPONENTS =  'Component::SetMultiple';
export function setComponents(components) {
  return {
    type: SET_COMPONENTS,
    data: components
  }
}


export function getComponents(): Function {
  return function(dispatch) {
    let url = `/components`;
    let success_cb = (data) => {
      dispatch(setComponents(data));
    }
    let error_cb = (errors) => {
      console.log(errors)
    }
    fetch_object(url, success_cb, error_cb);
  }

}

export function getComponent(id: toString): Function {
  return function(dispatch) {
    dispatch(requestComponent(id));
    let url = `/components/${id}`;
    let success_cb = (data) => {
      dispatch(setComponent(data));
    }
    let error_cb = (errors) => {
      dispatch(setLoadedModel(id))
      dispatch(setComponentErrors(id, errors));
    }
    fetch_object(url, success_cb, error_cb);
  }

}



