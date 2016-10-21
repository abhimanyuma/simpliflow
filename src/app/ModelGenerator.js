import Immutable from 'immutable';
import URLDictionary from './urls.js';
import { fetch_object } from './common/utils.js';

let ModelGenerator = {
  from_data: (data, name = "") => {
    data["sync"] = true;
    data["model_name"] = name;
    return Immutable.Map(data);
  },

  fetch: (map) => {
    map = map.set("sync", true);
    let model_name = map.get("model_name");
    if (URLDictionary[model_name]) {
      let url = URLDictionary[model_name]["full_url"];
      let action = URLDictionary[model_name]["action_type"]
      fetch_object(url, action)
    } else {
      console.error(`No url for ${map['model_name']}`);
    }
    return map;
  },

  set_loaded: (map, status = true) => {
    return map.set("loaded", status )
  }

}

export default ModelGenerator;