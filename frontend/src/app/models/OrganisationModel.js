// @flow
import BaseModel from './BaseModel.js';
import { fetch_object, create_object, delete_object, update_object, upload_file } from '../common/common.js'
import { setLoadingModel, setLoadedModel, setOrganisation, setOrganisationErrors } from '../actions/OrganisationActions.js';

class OrganisationModel extends BaseModel({
  name: null,
  slug: null,
  bio: "",
  tagline: "",
  user_level: "",
  members: [],
  logo: null,
}){

  organisation_id() {
    return this.id
  }

  organisation_slug() {
    return this.slug
  }

  user_display_level() {
    let level = this.user_level
    switch (level) {
      case "owner":
        return "Owner"
      case "admin":
        return "Manager"
      case "regular":
        return "Member"
    }
  }

  user_modifiable() {
    if (this.user_level == "owner" || this.user_level == "admin") {
      return true
    }
    return false
  }

  is_owner() {
    return (this.user_level == "owner")
  }

  url() {
    return `/organisations/${this.slug}`;
  }

  file_url(file_attribute) {
    return `${this.url()}/${file_attribute}`;
  }


  update(data, dispatch, is_file = false, options = {}) {
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

    //Rails 5 likes data within model variable
    if(!is_file) {
      data = {
        "organisation": data
      }
    }

    if (!is_file) {
      update_object(url, data, success_cb, error_cb);
    } else {
      upload_file(url, data, success_cb, error_cb, options);
    }
  }

  remove_file(file_attribute, dispatch) {
    let slug = this.slug
    dispatch(setLoadingModel(slug))

    let url = this.file_url(file_attribute)

    let success_cb = (data) => {
      dispatch(setOrganisation(data))
    }

    let error_cb = (errors) => {
      dispatch(setLoadedModel(slug))
      dispatch(setOrganisationErrors(slug, errors))
    }

    delete_object(url, success_cb, error_cb);
  }

}



export default OrganisationModel;


