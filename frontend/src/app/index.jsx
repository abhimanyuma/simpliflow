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

import ProfileContainer from './components/dashboard/profile/ProfileContainer.jsx';
import OrganisationsContainer from './components/dashboard/organisations/OrganisationsContainer.jsx';
import NewOrganisationContainer from './components/dashboard/organisations/NewOrganisationContainer.jsx';

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
        <Route path="organisations">
          <IndexRoute component={OrganisationsContainer} />
          <Route path="new" component={NewOrganisationContainer} />
        </Route>
      </Route>

    </Router>
  </Provider>
  , document.getElementById('main'));
