import { createStore } from 'redux';
import reducer from '../reducers/Reducer.js';

class BasicStore {
  constructor() {
    this.store = createStore(reducer);
  }

  dispatch(action) {
    return this.store.dispatch(action);
  }
  
  getState() {
    return this.store.getState();
  }

  subscribe(callback) {
    return this.store.subscribe(callback);
  }

}

let Store = new BasicStore();

export default Store;
