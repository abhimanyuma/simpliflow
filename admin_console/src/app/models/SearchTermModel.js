// @flow
import BaseModel from './BaseModel.js';
import { List } from 'immutable'
import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { setLoadingModel, setLoadedModel, updateSearchTerm, setSearchTermErrors } from '../actions/SearchTermActions.js';


class SearchTermModel extends BaseModel({
  term: "",
  search_path: "",
  search_variable: "",
  suggestions: new List([])
}){

  url(term) {
    return `/${this.search_path}?${this.search_variable}=${term}`
  }

  dispatch_new_data(new_term, items, dispatch) {
    let new_data = {
      term: new_term,
      suggestions: items
    }
    dispatch(updateSearchTerm(this.id, new_data))
  }




  search(new_term, dispatch) {
    let cur_term = this.term
    if(cur_term == new_term) {
      return null
    }
    let id = this.id

    dispatch(setLoadingModel(id))

    let url = this.url(new_term)
    let success_cb = (items) => {
      this.dispatch_new_data(new_term, items, dispatch)
    }

    let error_cb = (errors) => {
      dispatch(setLoadedModel(id))
      dispatch(setSearchTermErrors(id, errors))
    }

    fetch_object(url, success_cb, error_cb)
  }

}

export default SearchTermModel;
