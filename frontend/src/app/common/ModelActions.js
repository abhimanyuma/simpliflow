// @flow

// TODO: Import more specific flow type for Map
import {Map} from 'immutable';
import URLDictionary from './urls.js';
import { fetch_object } from './utils.js';

let ModelActions = {
  from_data: (data: Object, name: string = ""): Object => {
    data["sync"] = false;
    data["loading"] = false;
    data["model_name"] = name;
    return Map(data);
  },

  set_loading: (map: Object): Object => {
    map = map.set("loading", true);
    map = map.set("sync", false);
    return map;
  },

  set_loaded: (map: Object): Object => {
    map = map.set("loading", false);
    map = map.set("sync", true);
    return map;
  },

  set_data: (map: Object, data: Object): Object => {
    return map.merge(data);
  },

  set_errors: (map: Object, errors: any): Object => {
    map = map.set("errors", errors);
    return map;
  },

  unset_errors: (map: Object): Object => {
    map = map.delete("errors");
    return map;
  },

  multi_get_array: (map: Object, fields: Array): Array => {
    let response: Array = []
    for(let field of fields) {
      response.push(map.get(field))
    }
    return(response);
  },

  multi_get: (map: Object, fields: Array, as_array: boolean = false): Object | Array  => {
    if (as_array) {
      return (self.mult_get_array(map, fields));
    } else {
      let response: Object = {}
      for (let field of fields) {
        if (map.get(field)) {
          reponse[field] = map.get(field)
        }
      }
      return(response);
    }
  }
}

export default ModelActions;