import Backbone from 'backbone';

class UserModel extends Backbone.Model {
  initialize() {
    this.id = 1;
    this.name = "Abhimanyu";
    this.user_name = "codeN";
    this.fetch();
  }
}

export default UserModel;
