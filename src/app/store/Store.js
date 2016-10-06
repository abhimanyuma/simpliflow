import { createStore } from 'redux';
import reducer from '../reducers/Reducer.js';

class BasicStore {
  constructor() {
    this.store = createStore(reducer);
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

}

let Store = new BasicStore();

export default Store;
