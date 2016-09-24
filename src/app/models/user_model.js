import Backbone from 'backbone';

class UserModel extends Backbone.Model {

  model_name: "user"

  initialize(id, component) {
    this.id = id;
    this.components = [];
    this.register_component(component);
    this.fetch({
      success: () => {
        this.update_component();
      }
    });
    window.some = this;
  }

  register_component(component) {
    this.components.push(component)
  }

  update_component() {
    for (let component of this.components) {
      component.update_model(this)
    }
  }

  name() {
    return(this.get('name'));
  }
  urlRoot() {
    return(`http://api.flox.dev/users/${this.id}`);
  }
}

export default UserModel;
