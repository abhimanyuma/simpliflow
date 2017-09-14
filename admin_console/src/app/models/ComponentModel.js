// @flow
import BaseModel from './BaseModel.js';

import {Map} from 'immutable';

class ComponentModel extends BaseModel({
  name: "",
  description: "",
  as_file: true,
  object_name: "",
  variables: new Map({})
}){


}

export default ComponentModel;


