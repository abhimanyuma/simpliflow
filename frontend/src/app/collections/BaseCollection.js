// @flow
import {Map, Record} from 'immutable';
import {BaseModel} from '../models/BaseModel.js';

const BaseCollection = defaultValues => class extends Record({
  sync: false,
  loading: false,
  model: BaseModel,
  models: new Map({}),
  errors: new Map({}),
  ...defaultValues
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

  has_errors() {
    return (!(this.get("errors").isEmpty()))
  }

  add_model(id, data, reset = false) {
    let can_update = (!this.get(id)) || reset
    if (can_update) {
      return this.set("models", this.get("models").set(id, new this.model(data)))
    } else {
      return this
    }

  }

  remove_model(id) {
    let can_remove = !!(this.get(id))
    if (can_remove) {
      return  this.set("models", this.get("models").remove(id))
    } else {
      return this
    }

  }

  update_model(id, data) {
    let can_update =  !!(this.get(id))
    if (can_update) {
      return this.set("models", this.get("models").set(id, new this.model(data)))
    } else {
      return this
    }

  }

  set_multi(data) {
    return this.withMutations( (collection) => {
      for (let data_point of data) {
        let id = data_point["id"]
        collection = collection.add_model(id, data_point, true)
      }
    })
  }


}

export default BaseCollection;


