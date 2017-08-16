/* @flow */
import React from 'react';
import {render} from 'react-dom';

import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Bootstrap from 'bootstrap/dist/js/bootstrap.js';

import Workspace from './components/Workspace.jsx';
import Dashboard from './components/Dashboard.jsx';

import LoadingComponent from './components/common/LoadingComponent.jsx';

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/Reducer.js';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { requireAuth } from './common/authentication.js';

import { UserAuthWrapper } from 'redux-auth-wrapper'

import HomeHero from './components/static_components/HomeHero.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import SignupPage from './components/signup/SignupPage.jsx';


import DashboardHome from './components/dashboard/DashboardHome.jsx';
import OrganisationMain from './components/dashboard/organisations/OrganisationMain.jsx';
import FormMain from './components/dashboard/forms/FormMain.jsx';



import ProfileContainer from './components/dashboard/profile/ProfileContainer.jsx';
import OrganisationsContainer from './components/dashboard/organisations/OrganisationsContainer.jsx';
import NewOrganisationContainer from './components/dashboard/organisations/NewOrganisationContainer.jsx';
import SingleOrganisationContainer from './components/dashboard/organisations/SingleOrganisationContainer.jsx';
import EditOrganisationContainer from './components/dashboard/organisations/EditOrganisationContainer.jsx';
import DeleteOrganisationContainer from './components/dashboard/organisations/DeleteOrganisationContainer.jsx';

import OrganisationSublevelContainer from './components/dashboard/organisations/OrganisationSublevelContainer.jsx';

import SingleSublevelContainer from './components/dashboard/sublevels/SingleSublevelContainer.jsx';
import NewSublevelContainer from './components/dashboard/sublevels/NewSublevelContainer.jsx';
import EditSublevelContainer from './components/dashboard/sublevels/EditSublevelContainer.jsx';
import DeleteSublevelContainer from './components/dashboard/sublevels/DeleteSublevelContainer.jsx';

import FormsContainer from './components/dashboard/forms/FormsContainer.jsx';
import SingleFormContainer from './components/dashboard/forms/SingleFormContainer.jsx';


import { syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux'

const loggerMiddleware = createLogger();
const routingMiddleware = routerMiddleware(browserHistory)

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    routingMiddleware
  )
);

const history = syncHistoryWithStore(browserHistory, store)

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.profile, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirectAction
  LoadingComponent: LoadingComponent,
  authenticatingSelector: state => {
    if (!state.profile.get) {
      return true
    } else if ((state.profile.get("loading") === false) && (state.profile.get("sync") === true)) {
      return false
    } else {
      return true
    }
  },
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  predicate: profile => {return(profile.get && profile.get('auth_token'))}
})


render(
  <Provider store={store}>
    <Router history={history}>

      <Route path="/" component={Workspace}>
        <IndexRoute component={HomeHero} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Route>
      <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)}>
        <IndexRoute component={DashboardHome} />
        <Route path="profile" component={ProfileContainer} />
        <Route path="organisations" component={OrganisationMain}>
          <IndexRoute component={OrganisationsContainer} />
          <Route path="new" component={NewOrganisationContainer} />
          <Route path=":org_slug" component={SingleOrganisationContainer} />
          <Route path=":org_slug/edit" component={EditOrganisationContainer} />
          <Route path=":org_slug/delete" component={DeleteOrganisationContainer} />
          <Route path=":org_slug/teams" component={OrganisationSublevelContainer} type="teams" />
          <Route path=":org_slug/roles" component={OrganisationSublevelContainer} type="roles" />
          <Route path=":org_slug/teams/new" component={NewSublevelContainer} type="teams"/>
          <Route path=":org_slug/roles/new" component={NewSublevelContainer} type="roles"/>
          <Route path=":org_slug/teams/:sublevel_slug" component={SingleSublevelContainer} type="teams" />
          <Route path=":org_slug/roles/:sublevel_slug" component={SingleSublevelContainer} type="roles" />
          <Route path=":org_slug/teams/:sublevel_slug/edit" component={EditSublevelContainer} type="teams"/>
          <Route path=":org_slug/roles/:sublevel_slug/edit" component={EditSublevelContainer} type="roles"/>
          <Route path=":org_slug/teams/:sublevel_slug/delete" component={DeleteSublevelContainer} type="teams"/>
          <Route path=":org_slug/roles/:sublevel_slug/delete" component={DeleteSublevelContainer} type="roles"/>
        </Route>
        <Route path="forms" component={FormMain}>
          <IndexRoute component={FormsContainer} />
          <Route path=":form_id" component={SingleFormContainer} />
        </Route>
      </Route>

    </Router>
  </Provider>
  , document.getElementById('main'));
