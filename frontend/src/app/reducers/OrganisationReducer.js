// @flow

import OrganisationModel from '../models/OrganisationModel.js';
import OrganisationCollection from '../collections/OrganisationCollection.js';

import { Map } from 'immutable';

export const organisations = function(state: Object = new OrganisationCollection({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  let org_slug = null
  let model = null

  if (action.org_slug) {
    org_slug = action.org_slug
  }

  if(object && object == "Organisation" && method) {
    switch (method) {
      case "Request":
        //Set state to emptry profile
        model = state.models.get(org_slug)
        if (model) {
          state = state.set("models", state.models.set(org_slug, model.set_loading()))
        }
        break;
      case "Set":
        let org_slug = action.data["slug"]
        state = state.set("models", state.models.set(org_slug, new OrganisationModel(action.data)))
        model = state.models.get(org_slug)
        state = state.set("models", state.models.set(org_slug, model.set_loaded()))
        break;
      case "Unset":
        state = state.set("models", state.models.set(org_slug, new OrganisationModel({})))
        model = state.models.get(org_slug)
        state = state.set("models", state.models.set(org_slug, model.set_loaded()))
        break;
      case "SetErrors":
        model = state.models.get(org_slug)
        state = state.set("models", state.models.set(org_slug, model.set_errors(action.errors)))
        break;
      case "SetLoadedModel":
        model = state.models.get(org_slug)
        state = state.set("models", state.models.set(org_slug, model.set_loaded()))
        break;
      case "SetLoadingModel":
        model = state.models.get(org_slug)
        state = state.set("models", state.models.set(org_slug, model.set_loading()))
        break;
      case "UnsetErrors":
        model = state.models.get(org_slug)
        state = state.set("models", state.models.set(org_slug, model.unset_errors()))
        break;
      default:
       break;
   }
  }

  return state;
}