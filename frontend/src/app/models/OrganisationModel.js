// @flow
import BaseModel from './BaseModel.js';
import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { setLoadingModel, setLoadedModel, setOrganisation, setOrganisationErrors } from '../actions/OrganisationActions.js';

class OrganisationModel extends BaseModel({
  user_level: "member",
  name: null,
  slug: null,
  bio: "",
  tagline: "",
  member_usernames: []
}){

  organisation_id() {
    return this.id
  }

  url() {
    return `/organisations/${this.slug}`;
  }

  update(data, dispatch) {
    let slug = this.slug
    dispatch(setLoadingModel(slug))

    let url = this.url()
    let success_cb = (data) => {
      dispatch(setOrganisation(data))
    }

    let error_cb = (errors) => {
      dispatch(setLoadedModel(slug))
      dispatch(setOrganisationErrors(slug, errors))
    }

    data = {
      "organisation": data
    }

    update_object(url, data, success_cb, error_cb);
  }

}

export default OrganisationModel;


