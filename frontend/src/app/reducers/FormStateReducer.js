// @flow

import ModelActions from '../common/ModelActions.js';
import { Map, List } from 'immutable';



export const form_state = function(state: Object = Map({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  if(object && object == "FormState" && method) {
  }

  return state;
}