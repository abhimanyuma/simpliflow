// @flow
import BaseModel from './BaseModel.js';

import {List} from 'immutable';

import { fetch_object, create_object, delete_object, update_object, upload_file } from '../common/common.js'
import { setLoadingModel, setLoadedModel, setForm, setFormErrors } from '../actions/FormActions.js';


class FormModel extends BaseModel({
  title: "",
  elements: new List([]),
  source: "LOCAL",
  sub_title: "",
  content: "",
  content_type: "plain_text",
  organisation_id: null,
  uuid: "",
  hide_title: false
}){

  url() {
    return `/forms/${this.uuid}`;
  }
  update(data, dispatch) {
    let uuid = this.uuid
    dispatch(setLoadingModel(uuid))

    let url = this.url()

    let success_cb = (data) => {
      dispatch(setForm(data))
    }

    let error_cb = (errors) => {
      dispatch(setLoadedModel(uuid))
      dispatch(setFormErrors(uuid, errors))
    }

    //Rails 5 likes data within model variabl
    data = {
      "form": data
    }

    update_object(url, data, success_cb, error_cb);
  }

}

export default FormModel;


