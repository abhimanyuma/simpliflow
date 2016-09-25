import Backbone from 'backbone';
import {EventEmitter} from 'events';

import ProfileModel from './ProfileModel.js';

var CHANGE_EVENT = "change";

class ProfileStore extends EventEmitter {

  constructor() {
    super();
    var that = this;
    this.dispatchToken = window.Dispatcher.register(function(action) {
      switch(action.type){
          case "Profile::Get":
            that.get_profile();
            that.emitChange();
          default:
            //no-op
      }
    });
  }


  get_profile() {
    if(this.current_user){
      return(this.current_user);
    } else {
      var that = this;
      this.current_user = new ProfileModel();
      this.current_user.fetch({
        success: function() {
          that.emitChange();
        },
        error: function() {
          that.emitChange();
        }
      });
    }

  }

  name() {
    if(this.current_user && this.current_user) {
      return(this.current_user.get('name'));
    } else {
      return(null);
    }
  }

  emitChange() {
   this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }


}


export default ProfileStore;
