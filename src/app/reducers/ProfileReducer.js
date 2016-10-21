import ModelActions from '../ModelActions.js';
import Immutable from 'immutable';


export const profile = function(state=Immutable.Map({}), action) {
  let object = action.type.split("::")[0]
  let method = action.type.split("::")[1]
  if(object && object == "Profile" && method) {
    switch (method) {
      case "Request":
        //Set state to emptry profile
        if (Immutable.is(Immutable.Map.empty, state)) {
          state = ModelActions.from_data({},"profile");
        }
        state = ModelActions.set_loading(state);
        
        break;
      case "Set":
        state = ModelActions.set_data(state, action.data);
        state = ModelActions.set_loaded(state);
        break;
      default:
       break;
   }  
  }

  return state;
}