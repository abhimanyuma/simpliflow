// @flow
import BaseModel from './BaseModel.js';
import { Map } from 'immutable'

class FormStateModel extends BaseModel({
  disabled: false,
  data: new Map({})
}){


}

export default FormStateModel;


