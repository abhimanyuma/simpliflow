// @flow

import FormModel from '../models/FormModel.js';
import FormCollection from '../collections/FormCollection.js';
import { Map } from 'immutable';

import { generateUnsafeUniqueId } from '../common/utils.js'

export const forms = function(state: Object = new FormCollection({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  let uuid = null
  let model = null

  if (action.uuid) {
    uuid = action.uuid
  }


  if(object && object == "Form" && method) {
    switch (method) {
      case "SetLocal":
        let id: string = action.id;
        let data = {};
        while (id === null) {
          id = generateUnsafeUniqueId(10);
          if (state.get(id)) {
            id = null;
          }
        }

        if (action.data) {
          data = action.data;
        }
        let reset: boolean = action.reset || false
        if (reset || !state.has(id)) {
          state = state.set("models", state.models.set(id, new FormModel(data)))
          model = state.models.get(id)
          state = state.set("models", state.models.set(id, model.set_loaded()))
        }
        break;
      case "SetMultiple":
        for (let single_form of action.data) {
          uuid = single_form["uuid"]
          state = state.set("models", state.models.set(uuid, new FormModel(single_form)))
          model = state.models.get(uuid)
          state = state.set("models", state.models.set(uuid, model.set_loaded()))
        }
        break;
      case "Set":
        uuid = action.data.id || action.data.uuid
        state = state.set("models", state.models.set(uuid, new FormModel(action.data)))
        model = state.models.get(uuid)
        state = state.set("models", state.models.set(uuid, model.set_loaded()))
        break;
      case "Set":
        uuid = action.data.id || action.data.uuid
        state = state.set("models", state.models.set(uuid, new FormModel(action.data)))
        model = state.models.get(uuid)
        state = state.set("models", state.models.set(uuid, model.set_loaded()))
        break;
      case "SetErrors":
        model = state.models.get(uuid)
        if (model) {
          state = state.set("models", state.models.set(uuid, model.set_errors(action.errors)))
        }
        break;
      case "SetLoadedModel":
        model = state.models.get(uuid)
        state = state.set("models", state.models.set(uuid, model.set_loaded()))
        break;
      case "SetLoadingModel":
        model = state.models.get(uuid)
        state = state.set("models", state.models.set(uuid, model.set_loading()))
        break;
      case "UnsetErrors":
        model = state.models.get(uuid)
        state = state.set("models", state.models.set(uuid, model.unset_errors()))
        break;
      default:
        break;
   }
  }

  return state;
}