// @flow

import FormModel from '../models/FormModel.js';
import { Map } from 'immutable';

import { generateUnsafeUniqueId } from '../common/utils.js'

export const forms = function(state: Object = Map({}), action: Object) {
  let object: string = action.type.split("::")[0]
  let method: string = action.type.split("::")[1]
  if(object && object == "Form" && method) {
    switch (method) {
      case "SetLocal":
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
          state = state.set(id, new FormModel(data));
        }
        break;
      default:
        break;
   }
  }

  return state;
}