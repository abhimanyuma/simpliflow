// @flow
import BaseModel from './BaseModel.js';
import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'
import { setLoadingModel, setLoadedModel, setOrganisation, setOrganisationErrors } from '../actions/OrganisationActions.js';

class OrganisationModel extends BaseModel({
  name: null,
  slug: null,
  bio: "",
  tagline: "",
  user_level: "",
  members: []
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


