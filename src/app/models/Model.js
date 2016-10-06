import Immutable from 'immutable';
import {ajax, safe_join} from '../common/utils.js';

class Model {

  constructor() {
    this.model_name = "generic_model";
    this.domain = window.location.hostname;
    this.data = new Immutable.Map({});
    this.sync = true;
    this.loaded = false;
  }

  full_url(url) {
      let protocol = window.location.protocol
      return `${protocol}//${safe_join(this.domain, url)}`
  }

  fetch () {
    let url = null;
    if (typeof(this.url) === "string") {
      url = this.url;
    } else {
      url = this.url();
    }
    this.sync = false;

    let full_url = this.full_url(url);

    console.log(`Fetching from ${full_url}`);
  }



}

export default Model;
