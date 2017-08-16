// @flow
import BaseCollection from './BaseCollection.js';
import TeamModel from '../models/TeamModel.js';

class TeamCollection extends BaseCollection({
  model: TeamModel
}){

  get_org_teams(org_identifier, by_id = false) {
    if (by_id) {
      return this.models.filter(x => (x.organisation_id == org_identifier))
    } else {
      return this.models.filter(x => (x.organisation_slug == org_identifier))
    }
  }

}

export default TeamCollection;

