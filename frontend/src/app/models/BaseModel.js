// @flow
import {Map} from 'immutable';

class BaseModel {

  constructor(data = {}) {
    this.sync = false
    this.loading = false
    this.data = Map(data)
    this.name = "Model"
  }

  set_loading() {
    this.sync = false
    this.loading = true
  }

  set_loaded() {
    this.loading = false
    this.sync = true
  }

  set_data(data) {
    this.data = this.data.merge(data)
  }

  set_errors(errors) {
    this.errors = Map(errors)
  }

  unset_errors() {
    this.errors = null
  }

  get(key) {
   return data.get(key)
  }

  multi_get_array(fields: Array) {
    let response: Array = []
    for(let field of fields) {
      response.push(self.get(field))
    }
    return(response);
  }

  multi_get(fields: Array, as_array: boolean = false) {
    if (as_array) {
      return (self.multi_get_array(fields));
    } else {
      let response: Object = {}
      for (let field of fields) {
        if (self.get(field)) {
          reponse[field] = self.get(field)
        }
      }
      return(response);
    }
  }
}

export default BaseModel;


