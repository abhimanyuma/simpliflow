// @flow
import BaseCollection from './BaseCollection.js';
import FormModel from '../models/FormModel.js';

class FormCollection extends BaseCollection({
  model: FormModel
}){
  get_global_forms () {
    models = self.get("models")

  }

  get_global_forms() {
    return this.models.filter(x => (x.source !== "LOCAL"))
  }
}

export default FormCollection;

