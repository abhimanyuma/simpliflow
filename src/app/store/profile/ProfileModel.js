import Backbone from 'backbone';

class ProfileModel extends Backbone.Model {

  constructor() {
    super();
  }

  url() {
    return("http://api.flox.dev/users/me");
  }

}

export default ProfileModel;
