// @flow

import SearchTermModel from '../models/SearchTermModel.js';
import SearchTermCollection from '../collections/SearchTermCollection.js';

import { Map } from 'immutable';

export const search_terms = function(state: Object = new SearchTermCollection({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  let id = null
  let model = null

  if (action.id) {
    id = action.id
  }

  if(object && object == "SearchTerm" && method) {
    switch (method) {
      case "Request":
        //Set state to emptry profile
        model = state.models.get(id)
        if (model) {
          state = state.set("models", state.models.set(id, model.set_loading()))
        }
        break;
      case "Set":
        let new_data = action.data
        new_data["id"] = id
        state = state.set("models", state.models.set(id, new SearchTermModel(new_data)))
        model = state.models.get(id)
        state = state.set("models", state.models.set(id, model.set_loaded()))
      case "Update":
        let additional_data = action.data
        model = state.models.get(id)
        model = model.merge(additional_data)
        state = state.set("models", state.models.set(id, model))
      case "SetLoadedModel":
        model = state.models.get(id)
        state = state.set("models", state.models.set(id, model.set_loaded()))
        break;
      case "SetLoadingModel":
        model = state.models.get(id)
        state = state.set("models", state.models.set(id, model.set_loading()))
        break;
      case "SetErrors":
        model = state.models.get(id)
        state = state.set("models", state.models.set(id, model.set_errors(action.errors)))
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