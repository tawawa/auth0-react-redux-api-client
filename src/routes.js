import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AuthService from './utils/AuthService';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import AccountsPage from './components/account/AccountsPage';
import ManageAccountPage from './components/account/ManageAccountPage'; //eslint-disable-line import/no-named-as-default

// TODO - externalize these params...
const AUTH0_CLIENT_ID = 'o25W0jPI01yRzatTbiHhY0dR3M7wyk3u';
const AUTH0_DOMAIN = 'demo-workshop.auth0.com';
const RESOURCE_API_AUDIENCE = 'https://resourceapi.com';
const ACCESS_TOKEN_SCOPES = 'read:account read:accounts create:account update:account delete:account';

// const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__); // eslint-disable-line

const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN, RESOURCE_API_AUDIENCE, ACCESS_TOKEN_SCOPES); // eslint-disable-line

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

export default (
  <Route path="/" component={App} auth={auth}>
    <IndexRoute component={HomePage} onEnter={requireAuth} />
    <Route path="login" component={LoginPage} />
    <Route path="home" component={HomePage} onEnter={requireAuth} />
    <Route path="accounts" component={AccountsPage} onEnter={requireAuth} />
    <Route path="account" component={ManageAccountPage} onEnter={requireAuth} />
    <Route path="account/:id" component={ManageAccountPage} onEnter={requireAuth} />
  </Route>
);
