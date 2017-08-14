// @flow

import UserOrganisationModel from '../models/UserOrganisationModel.js';
import UserOrganisationCollection from '../collections/UserOrganisationCollection.js';

import { Map } from 'immutable';

export const user_organisations = function(state: Object = Map({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  if(object && object == "UserOrganisation" && method) {
    switch (method) {
      case "Request":
        //Set state to emptry profile
        state = new UserOrganisationCollection({})
        state = state.set_loading();
        break;
      case "Set":
        state = new UserOrganisationCollection({})
        state = state.set_multi(action.data);
        state = state.set_loaded()
        break;
      case "Unset":
        state = new UserOrganisationCollection({})
        state = state.set_loaded();
        break;
      case "SetErrors":
        state = state.set_errors(action.errors)
        break;
      case "SetLoaded":
        state = state.set_loaded();
        break;
      case "SetLoading":
        state = state.set_loading();
        break;
      case "UnsetErrors":
        state = state.unset_errors()
        break;
      default:
       break;
   }
  }

  return state;
}