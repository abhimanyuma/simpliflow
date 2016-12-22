// @flow

import ModelActions from '../common/ModelActions.js';
import { Map } from 'immutable';
import { set_auth_from_user } from '../common/authentication.js';

export const profile = function(state: Object = Map({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  if(object && object == "Profile" && method) {
    switch (method) {
      case "Request":
        //Set state to emptry profile
        if (state.isEmpty()) {
          state = ModelActions.from_data({},"profile");
        }
        state = ModelActions.set_loading(state);
        
        break;
      case "Set":
        state = ModelActions.set_data(state, action.data);
        state = ModelActions.set_loaded(state);
        set_auth_from_user(state);
        break;
      case "Unset":
        state = ModelActions.from_data({},"profile");
        state = ModelActions.set_loaded(state);
      default:
       break;
   }  
  }

  return state;
}