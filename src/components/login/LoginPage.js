import React, {PropTypes} from 'react';
import {Form, Button, ButtonToolbar} from 'react-bootstrap';
import AuthService from './../../utils/AuthService';

class LoginPage extends React.Component {

  getAuthParams() {
      return {
        clientID: 'PoXI62VzgVM5iaMfZhiwR06AxQZNAhDE',
        redirectUri: 'http://localhost:3000/login',
        connection: 'HuubapDB',
        scope: 'openid user_id nickname email read:account read:accounts create:account update:account delete:account',
        responseType: 'id_token token',
        audience: 'https://resourceapi.com',
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
      <div className="login-root">
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <ButtonToolbar>
            <Button type="submit" bsStyle="primary">Sign In</Button>
            <Button onClick={this.signUp.bind(this)}>Sign Up</Button>
          </ButtonToolbar>
        </Form>
      </div>
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
