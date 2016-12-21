import Immutable from 'immutable';
import URLDictionary from './urls.js';
import { fetch_object } from './utils.js';

let ModelActions = {
  from_data: (data, name = "") => {
    data["sync"] = false;
    data["loading"] = false;
    data["model_name"] = name;
    return Immutable.Map(data);
  },

  set_loading: (map) => {
    map = map.set("loading", true);
    map = map.set("sync", false);
    return map;
  },

  set_loaded: (map) => {
    map = map.set("loading", false);
    map = map.set("sync", true);
    return map;
  },

  set_data: (map, data) => {
    return map.merge(data);
  }
}

export default ModelActions;