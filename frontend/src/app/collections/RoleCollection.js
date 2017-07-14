// @flow
import BaseCollection from './BaseCollection.js';
import RoleModel from '../models/RoleModel.js';

class RoleCollection extends BaseCollection({
  model: RoleModel
}){

  get_org_roles(org_identifier, by_id = false) {
    if (by_id) {
      return this.models.filter(x => (x.organisation_id == org_identifier))
    } else {
      return this.models.filter(x => (x.organisation_slug == org_identifier))
    }
  }

}

export default RoleCollection;

