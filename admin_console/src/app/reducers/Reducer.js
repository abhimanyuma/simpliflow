// @flow

import {combineReducers} from 'redux';
import { profile } from './ProfileReducer.js';
import { form_state } from './FormStateReducer.js';
import { forms } from './FormReducer.js';
import { routerReducer } from 'react-router-redux';
import { user_organisations } from './UserOrganisationReducer.js';
import { organisations } from './OrganisationReducer.js';
import { search_terms } from './SearchTermReducer.js';
import { teams } from './TeamReducer.js';
import { roles } from './RoleReducer.js';

let reducer = combineReducers({
  profile: profile,
  form_state: form_state,
  forms: forms,
  user_organisations: user_organisations,
  organisations: organisations,
  search_terms: search_terms,
  teams: teams,
  roles: roles,
  routing: routerReducer
});

export default reducer;

/*
This seems as good as a place as any to explain the reducer terminology we follow.
There are certain standard dispatches we will use

"Model::Get" with ID will do a model.fetch with or without reset
"Model::Reset" with  ID will do a model.fetch with reset
"Model::Set" with ID will set that in the data field of the model, you can use remove:true to remove
"Model::Put" with ID will save that model to disk
"Model::Destroy" with ID will send a delete call
"Model::Create" will expect a model in the whole data field.
"Collection::Fetch" will do what it is expected to do

ID can be skipped if the model is a singleton.

They sent out the following events
("success", action)
("failure", action)

Every model will have a data field, and can have a error_data field
*/