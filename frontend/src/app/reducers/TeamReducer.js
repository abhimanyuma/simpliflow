// @flow

import TeamModel from '../models/TeamModel.js';
import TeamCollection from '../collections/TeamCollection.js';

import { Map } from 'immutable';

export const teams = function(state: Object = new TeamCollection({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  let team_slug = null
  let org_slug = null
  let model = null

  if (action.team_slug) {
    team_slug = action.team_slug
  }
   if (action.org_slug) {
    org_slug = action.org_slug
  }

  let full_slug = `${org_slug}/${team_slug}`

  if(object && object == "Team" && method) {
    switch (method) {
      case "Request":
        //Set state to emptry profile
        model = state.models.get(full_slug)
        if (model) {
          state = state.set("models", state.models.set(full_slug, model.set_loading()))
        }
        break;
      case "Set":
        full_slug = `${action.data["organisation_slug"]}/${action.data["slug"]}`
        state = state.set("models", state.models.set(full_slug, new TeamModel(action.data)))
        model = state.models.get(full_slug)
        state = state.set("models", state.models.set(full_slug, model.set_loaded()))
        break;
      case "SetMultiple":
        for (let single_team of action.data) {
          full_slug = `${single_team["organisation_slug"]}/${single_team["slug"]}`
          state = state.set("models", state.models.set(full_slug, new TeamModel(single_team)))
          model = state.models.get(full_slug)
          state = state.set("models", state.models.set(full_slug, model.set_loaded()))
        }
        break;
      case "Unset":
        state = state.set("models", state.models.set(full_slug, new TeamModel({})))
        model = state.models.get(full_slug)
        state = state.set("models", state.models.set(full_slug, model.set_loaded()))
        break;
      case "Remove":
        state = state.set("models", state.models.remove(full_slug))
        break;
      case "SetErrors":
        model = state.models.get(full_slug)
        if (model) {
          state = state.set("models", state.models.set(full_slug, model.set_errors(action.errors)))
        }
        break;
      case "SetLoadedModel":
        model = state.models.get(full_slug)
        state = state.set("models", state.models.set(full_slug, model.set_loaded()))
        break;
      case "SetLoadingModel":
        model = state.models.get(full_slug)
        state = state.set("models", state.models.set(full_slug, model.set_loading()))
        break;
      case "UnsetErrors":
        model = state.models.get(full_slug)
        state = state.set("models", state.models.set(full_slug, model.unset_errors()))
        break;
      default:
       break;
   }
  }

  return state;
}