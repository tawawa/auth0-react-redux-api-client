import {EventEmitter} from 'events';
import {isTokenExpired} from './jwtHelper';
import Auth0Lock from 'auth0-lock';
import {browserHistory} from 'react-router';

export default class AuthService extends EventEmitter {

  constructor(clientId, domain, audience, scopes) {
    super();
    // Configure Auth0
    // TODO - FIX the nonce value to use properly generated one
    var fakeNonce = '12345';

    // this is to get around a bug with nonce checking on response from authentication
    // localStorage.setItem('com.auth0.auth.nonce', fakeNonce);

    this.lock = new Auth0Lock(clientId, domain, {
      // nonce: fakeNonce, // this is just for Custom DB Connection only
      auth: {
        redirectUrl: `${window.location.origin}/login`,
        responseType: 'id_token token',
        nonce: fakeNonce,
        params: {
          // Learn about scopes: https://auth0.com/docs/scopes
          scope: 'openid user_id name nickname email picture ' + scopes,
          // nonce: '12345',  // this is just for Custom DB Connection only
          audience: audience
        }
      }
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setTokens(authResult.idToken, authResult.accessToken);
    // navigate to the home route
    browserHistory.replace('/home');
    // Async loads the user profile data

    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
      }
    });

  }

  _authorizationError(error) {
    // Unexpected authentication error
    console.log('Authentication Error', error);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved id_token and access_token and they are still valid
    const idToken = this.getIdToken();
    const accessToken = this.getAccessToken();
    const idTokenValid = !!idToken && !isTokenExpired(idToken);
    const accessTokenValid = !!accessToken && !isTokenExpired(accessToken);
    return idTokenValid && accessTokenValid;
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile);
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  setTokens(idToken, accessToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('access_token', accessToken);
  }

  getIdToken() {
    // Retrieves the id token from localStorage
    return localStorage.getItem('id_token');
  }

  getAccessToken() {
    // Retrieves the access token from localStorage
    return localStorage.getItem('access_token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
  }
}
