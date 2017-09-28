// @flow

import ComponentModel from '../models/ComponentModel.js';
import ComponentCollection from '../collections/ComponentCollection.js';
import { Map } from 'immutable';

import { generateUnsafeUniqueId } from '../common/utils.js'

export const components = function(state: Object = new ComponentCollection({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  let id = null
  let model = null

  if (action.id) {
    id = action.id
  }


  if(object && object == "Component" && method) {
    switch (method) {
      case "SetMultiple":
        for (let single_component of action.data) {
          id = single_component["id"]
          state = state.set("models", state.models.set(id, new ComponentModel(single_component)))
          model = state.models.get(id)
          state = state.set("models", state.models.set(id, model.set_loaded()))
        }
        break;
      case "Set":
        id = action.data.id
        state = state.set("models", state.models.set(id, new ComponentModel(action.data)))
        model = state.models.get(id)
        state = state.set("models", state.models.set(id, model.set_loaded()))
        break;
      case "SetErrors":
        model = state.models.get(id)
        if (model) {
          state = state.set("models", state.models.set(id, model.set_errors(action.errors)))
        }
        break;
      case "SetLoadedModel":
        model = state.models.get(id)
        state = state.set("models", state.models.set(id, model.set_loaded()))
        break;
      case "SetLoadingModel":
        model = state.models.get(id)
        state = state.set("models", state.models.set(id, model.set_loading()))
        break;
      case "UnsetErrors":
        model = state.models.get(id)
        state = state.set("models", state.models.set(id, model.unset_errors()))
        break;
      default:
        break;
   }
  }

  return state;
}