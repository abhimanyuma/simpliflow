
import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'

const SET_LOADED =  'SearchTerm::SetLoadedModel';
export function setLoadedModel(id): {type: string, id: string} {
  return {
    type: SET_LOADED,
    id: id
  }
}

const SET_LOADING =  'SearchTerm::SetLoadingModel';
export function setLoadingModel(id): {type: string, id: string} {
  return {
    type: SET_LOADING,
    id: id
  }
}

const UPDATE_SEARCH_TERM = 'SearchTerm::Update'
export function updateSearchTerm(id, data) {
  return {
    id: id,
    type: UPDATE_SEARCH_TERM,
    data: data
  }
}

export function createSearchTerm(id: string, search_path, search_variable): {type: string, refresh: boolean} {
  return setSearchTerm(id,{
    search_path: search_path,
    search_variable: search_variable
  })
}

const SET_SEARCH_TERM = 'SearchTerm::Set';
export function setSearchTerm(id: string, data ): {type: string, data: Object} {
  return {
    type: SET_SEARCH_TERM,
    id: id,
    data: data
  }
}

const SET_SEARCH_TERM_ERRORS =  'SearchTerm::SetErrors';
export function setSearchTermErrors(id: string, errors: Object): {type: string, errors: Object} {
  return {
    type: SET_SEARCH_TERM_ERRORS,
    errors: errors,
    id: id
  }
}

export function do_search(search_model, term): Function {
  return function(dispatch) {
    search_model.search(term, dispatch)
  }

}

