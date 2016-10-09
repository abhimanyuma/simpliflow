import ProfileModel from '../models/ProfileModel.js';


export const profile = function(state={}, action) {
  let object = action.type.split("::")[0]
  let method = action.type.split("::")[1]
  if(object && object == "Profile" && method) {
    switch (method) {
      case "Get":
        let fetch = false;
        
        if(!(state.profile_model)) {
          state.profile_model = new ProfileModel();
          fetch = true
        }

        if(action.reset == true || fetch){
          state.profile_model.fetch();
        }

        break;
      default:
        return state;
    }
  }

  return state;
}