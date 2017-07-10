// @flow
import BaseModel from './BaseModel.js';
import { fetch_object, create_object, delete_object, update_object } from '../common/common.js'

class TeamModel extends BaseModel({
  name: null,
  slug: null,
  bio: "",
  organisation_id: null,
  organisation_slug: "",
  user_level: "",
  members: []
}){

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
    return `/teams/${this.slug}`;
  }

}

export default TeamModel;


