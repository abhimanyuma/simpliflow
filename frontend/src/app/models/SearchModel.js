// @flow
import BaseModel from './BaseModel.js';
import { List } from 'immutable'

class SearchModel extends BaseModel({
  term: "",
  suggestions: new List([])
}){



}

export default SearchModel;


