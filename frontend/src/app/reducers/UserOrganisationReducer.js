// @flow

import ModelActions from '../common/ModelActions.js';
import { Map } from 'immutable';

export const user_organisations = function(state: Object = Map({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  if(object && object == "UserOrganisation" && method) {
    switch (method) {
      case "Request":
        //Set state to emptry profile
        if (state.isEmpty()) {
          state = ModelActions.from_data({},"user_organisations");
        }
        state = ModelActions.set_loading(state);

        break;
      case "Set":
        state = ModelActions.set_data(state, {"data": action.data} );
        state = ModelActions.set_loaded(state);
        break;
      case "Unset":
        state = ModelActions.from_data({},"user_organisations");
        state = ModelActions.set_loaded(state);
        break;
      case "SetErrors":
        state = ModelActions.set_errors(state, action.errors)
        break;
      case "SetLoaded":
        state = ModelActions.set_loaded(state);
        break;
      case "SetLoading":
        state = ModelActions.set_loading(state);
        break;
      case "UnsetErrors":
        state = ModelActions.unset_errors(state)
        break;
      default:
       break;
   }
  }

  return state;
}