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
          reponse[field] = this.get(field)
        }
      }
      return(response);
    }
  }

  has_errors() {
    return (!(this.get("errors").isEmpty()))
  }
}

export default BaseModel;


