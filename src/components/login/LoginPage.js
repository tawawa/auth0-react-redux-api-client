import React, {PropTypes} from 'react';
import {Button, ButtonToolbar, Jumbotron} from 'react-bootstrap';
import AuthService from './../../utils/AuthService';

class LoginPage extends React.Component {

  getAuthParams() {
    return {
      clientID: 'PoXI62VzgVM5iaMfZhiwR06AxQZNAhDE',
      redirectUri: 'http://localhost:3000/login',
      connection: 'HuubapDB',
      scope: 'openid user_id nickname email read:account read:accounts create:account update:account delete:account',
      responseType: 'id_token token',
      audience: 'https://resourceapi.com'
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.auth.login(this.getAuthParams(), function (err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  signUp() {
    this.props.auth.signup(this.getAuthParams(), function (err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render() {
    return (
      <Jumbotron>
        <h2 className="main_title">
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
        </h2>
        <div className="login_root">
          <h2>Login</h2>
          <ButtonToolbar className="login_toolbar">
            <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)}>Login</Button>
            <Button bsStyle="primary" onClick={this.signUp.bind(this)}>Signup</Button>
          </ButtonToolbar>
        </div>
      </Jumbotron>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object
};

LoginPage.propTypes = {
  location: PropTypes.object,
  auth: PropTypes.instanceOf(AuthService)
};

export default LoginPage;
