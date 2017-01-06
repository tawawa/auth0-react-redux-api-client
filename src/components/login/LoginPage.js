import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap';
import AuthService from './../../utils/AuthService';

class LoginPage extends React.Component {

  getAuthParams() {

    // let employee_id = ReactDOM.findDOMNode(this.refs.employee_id).value;
    // let company_code = ReactDOM.findDOMNode(this.refs.company_code).value;
    //
    // let username = {
    //   employee_id: employee_id,
    //   company_code: company_code
    // };


    https://demo-workshop.auth0.com/authorize?client_id=PoXI62VzgVM5iaMfZhiwR06AxQZNAhDE&response_type=id_token token&scope=openid profile read:accounts&redirect_uri=http://localhost:3000/login&nonce=12345&audience=https://resourceapi.com

      // 'clientID',
      //   'responseType',
      //   'responseMode',
      //   'redirectUri',
      //   'scope',
      //   'audience

      return {
        // connection: 'DBConn1',
        clientID: 'PoXI62VzgVM5iaMfZhiwR06AxQZNAhDE',
        redirectUri: 'http://localhost:3000/login',
        connection: 'HuubapDB',
        // responseType: 'token',
        scope: 'openid user_id nickname email read:account read:accounts create:account update:account delete:account',
        responseType: 'id_token token',
        audience: 'https://resourceapi.com',
        // nonce: '12345',
        // state: '12345',
        // username: JSON.stringify(username),
        // password: ReactDOM.findDOMNode(this.refs.password).value
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
