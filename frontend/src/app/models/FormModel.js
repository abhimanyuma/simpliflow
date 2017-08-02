// @flow
import BaseModel from './BaseModel.js';

import {List} from 'immutable';

class FormModel extends BaseModel({
  title: "",
  elements: new List([]),
  hide_title: false
}){


}

export default FormModel;


