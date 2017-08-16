// @flow
import BaseModel from './BaseModel.js';

import {List} from 'immutable';

class FormModel extends BaseModel({
  title: "",
  elements: new List([]),
  source: "LOCAL",
  sub_title: "",
  content: "",
  organisation_id: null,
  uuid: "",
  hide_title: false
}){


}

export default FormModel;


