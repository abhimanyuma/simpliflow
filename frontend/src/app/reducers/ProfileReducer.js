// @flow

//import ModelActions from '../common/ModelActions.js';
import ProfileModel from '../models/ProfileModel.js';
import { set_auth_from_user } from '../common/authentication.js';

export const profile = function(state: Object = new ProfileModel({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  if(object && object == "Profile" && method) {
    switch (method) {
      case "Request":
        //Set state to emptry profile

        state = new ProfileModel({})
        state = state.set_loading();

        break;
      case "Set":
        state = new ProfileModel(action.data);
        state = state.set_loaded();
        set_auth_from_user(state);
        break;
      case "Unset":
        state = new ProfileModel({});
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