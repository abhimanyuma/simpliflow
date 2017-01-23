// @flow

import ModelActions from '../common/ModelActions.js';
import { Map, List } from 'immutable';



export const form_state = function(state: Object = Map({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  if(object && object == "FormState" && method) {
    switch (method) {
      case "Set":
        let id: string = action.id;
        let data = {};
        while (id === null) {
          id = generateUnsafeUniqueId(10);
          if (state.get(id)) {
            id = null;
          }
        }

        if (action.data) {
          data = action.data;
        }
        let reset: boolean = action.reset || false

        if (reset || !state.has(id)) {
          state = state.set(id, ModelActions.from_data(data,"form_state"));
        }
        break;
      default:
        break;
    }
  }

  return state;
}