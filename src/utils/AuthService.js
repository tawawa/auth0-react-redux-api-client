import {EventEmitter} from 'events';
import {isTokenExpired} from './jwtHelper';
import auth0 from 'auth0-js';
import { browserHistory } from 'react-router';

export default class AuthService extends EventEmitter {

  constructor(clientId, domain) {
    super();
    // Configure Auth0

    this.auth0 = new auth0.WebAuth({
      domain: domain,
      clientID: clientId,
      audience: 'https://resourceapi.com',
      responseType: 'id_token token',
      redirectUri: `${window.location.origin}/login`
    });

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  login(params, onError) {
    console.log(params);
    this.auth0.authorize(params, onError);
  }

  signup(params, onError) {
    this.auth0.signup(params, onError);
  }

  parseHash(hash) {
    this.auth0.parseHash(hash, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.setIdToken(authResult.idToken);
        this.setAccessToken(authResult.accessToken);
        this.auth0.client.userInfo(authResult.accessToken, (error, user) => {
          if (error) {
            console.log('Error loading the Profile', error);
          } else {
            console.debug('ok, calling setProfile');
            console.debug(user);
            this.setProfile(user);
            browserHistory.push('/');
          }
        });
      }
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const idToken = this.getIdToken();
    const accessToken = this.getAccessToken();
    return !!idToken && !isTokenExpired(idToken)
      && !!accessToken && !isTokenExpired(accessToken);
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
    console.debug('setProfile called');
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile);
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  setIdToken(idToken) {
    // Saves user id token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  setAccessToken(accessToken) {
    // Saves user access token to localStorage
    localStorage.setItem('access_token', accessToken);
  }

  getIdToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  getAccessToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('access_token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
  }
}
