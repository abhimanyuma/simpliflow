// @flow
import BaseModel from './BaseModel.js';
import { List } from 'immutable'
import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { setLoadingModel, setLoadedModel, updateSearchTerm, setSearchTermErrors } from '../actions/SearchTermActions.js';


class SearchTermModel extends BaseModel({
  term: "",
  access_path: "",
  access_variable: "",
  suggestions: new List([])
}){

  url(term, action = "search") {
    return `/${this.access_path}/${action}?${this.access_variable}=${term}`
  }

  dispatch_new_data(new_term, items, dispatch) {
    let new_data = {
      term: new_term,
      suggestions: items
    }
    dispatch(updateSearchTerm(this.id, new_data))
  }



  search(new_term, dispatch) {
    this.search_or_validate(new_term, dispatch, "search")
  }

  validate(term, dispatch, callback) {
    this.search_or_validate(term, dispatch, "validate", callback)
  }

  search_or_validate(term, dispatch, action, callback) {
    let cur_term = this.term
    if(cur_term == term) {
      return null
    }
    let id = this.id

    dispatch(setLoadingModel(id))

    let url = this.url(term, action)
    let success_cb = (items) => {
      if (action == "search") {
        this.dispatch_new_data(term, items, dispatch)
      } else if (action == "validate") {
        dispatch(setLoadedModel(id))
        callback(term)
      }
    }

    let error_cb = (errors) => {
      dispatch(setLoadedModel(id))
      dispatch(setSearchTermErrors(id, errors))
    }

    fetch_object(url, success_cb, error_cb)
  }

}

export default SearchTermModel;
