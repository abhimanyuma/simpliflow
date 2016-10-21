import ModelGenerator from '../ModelGenerator.js';
import Immutable from 'immutable';


export const profile = function(state=Immutable.Map({}), action) {
  let object = action.type.split("::")[0]
  let method = action.type.split("::")[1]
  if(object && object == "Profile" && method) {
    switch (method) {
      case "Request":
        //Set state to emptry profile
        if (Immutable.is(Immutable.Map.empty, state)) {
          state = ModelGenerator.from_data({},"profile");
        }
        state = state.set('loading', true);
        
        break;
      case "Set":
        console.log("Here");
        action.data['loading'] = false;
        state = Immutable.Map(action.data)
        console.log(state);
        break;
      default:
       break;
   }  
  }

  return state;
}