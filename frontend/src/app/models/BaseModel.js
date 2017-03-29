// @flow
import {Map, Record} from 'immutable';

const BaseModel = defaultValues => class extends Record({
  sync: false,
  loading: false,
  id: undefined,
  created_at: undefined,
  updated_at: undefined,
  errors: new Map({}),
  ...defaultValues,
}) {


  set_loading() {
    return this.set("sync", false).set("loading", true)
  }

  set_loaded() {
    return this.set("sync", true).set("loading", false)
  }

  set_errors(errors) {
    return this.set("errors", new Map(errors))
  }

  unset_errors() {
   return this.set("errors", new Map({}))
  }

  multi_get_array(fields: Array) {
    let response: Array = []
    for(let field of fields) {
      response.push(this.get(field))
    }
    return(response);
  }

  multi_get(fields: Array, as_array: boolean = false) {
    if (as_array) {
      return (this.multi_get_array(fields));
    } else {
      let response: Object = {}
      for (let field of fields) {
        if (this.get(field)) {
          response[field] = this.get(field)
        }
      }
      return(response);
    }
  }

   multi_get_data(fields: Array) {
    let response: Object = {}
    for (let field of fields) {
      if (this.get_data(field)) {
        response[field] = this.get_data(field)
      }
    }
    return(response);
  }

  has_errors() {
    return (!(this.get("errors").isEmpty()))
  }

  update_data(new_data) {
    let data = this.get("data") || new Map({})
    data = data.merge(new_data)
    return this.set("data", data)
  }

  get_data(field) {
    if (this.get("data") && (this.get("data").get(field) !== undefined)) {
      return this.get("data").get(field)
    } else {
      return null
    }
  }
}

export default BaseModel;


