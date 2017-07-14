// @flow
import BaseModel from './BaseModel.js';
import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'

import { setLoadingModel, setLoadedModel, setTeam, setTeamErrors } from '../actions/RoleActions.js';


class RoleModel extends BaseModel({
  name: null,
  slug: null,
  bio: "",
  organisation_id: null,
  organisation_name: null,
  organisation_slug: "",
  user_level: "",
  members: []
}){

  role_id() {
    return this.id
  }

  role_slug() {
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
    return `/organisations/${this.organisation_slug}/roles/${this.slug}`;
  }

  update(data, dispatch) {
    let slug = this.slug
    let org_slug = this.organisation_slug
    dispatch(setLoadingModel(org_slug, slug))

    let url = this.url()
    let success_cb = (data) => {
      dispatch(setRole(data))
    }

    let error_cb = (errors) => {
      dispatch(setLoadedModel(org_slug, slug))
      dispatch(setRoleErrors(org_slug, slug, errors))
    }

    data = {
      "role": data
    }

    update_object(url, data, success_cb, error_cb);
  }

}

export default RoleModel;


