// import React, {PropTypes} from 'react';
// import {Jumbotron, ButtonToolbar, Button} from 'react-bootstrap';
// import AuthService from './../../utils/AuthService';
//
// class LoginPage extends React.Component {
//   render() {
//     const {auth} = this.props;
//     return (
//       <Jumbotron>
//         <h2 className="main_title">
//           <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
//         </h2>
//         <div className="login_root">
//           <h2>Login</h2>
//           <ButtonToolbar className="login_toolbar">
//             <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
//           </ButtonToolbar>
//         </div>
//       </Jumbotron>
//     );
//   }
// }
//
// LoginPage.contextTypes = {
//   router: PropTypes.object
// };
//
// LoginPage.propTypes = {
//   location: PropTypes.object,
//   auth: PropTypes.instanceOf(AuthService)
// };
//
// export default LoginPage;

// new ...


import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar} from 'react-bootstrap';
import AuthService from './../../utils/AuthService';

class LoginPage extends React.Component {

  getAuthParams() {

    let employee_id = ReactDOM.findDOMNode(this.refs.employee_id).value;
    let company_code = ReactDOM.findDOMNode(this.refs.company_code).value;

    let username = {
      employee_id: employee_id,
      company_code: company_code
    };

    return {
      // connection: 'DBConn1',
      connection: 'HuubapDB',
      // responseType: 'token',
      scope: 'openid user_id nickname email read:account read:accounts create:account update:account delete:account',
      responseType: 'id_token token',
      audience: 'https://resourceapi.com',
      nonce: '12345',
      state: '12345',
      username: JSON.stringify(username),
      password: ReactDOM.findDOMNode(this.refs.password).value
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

  googleLogin() {
    this.props.auth.login({
      connection: 'google-oauth2'
    }, function (err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render() {
    return (
      <div className="login-root">
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>

          <FormGroup controlId="employee_id">
            <ControlLabel>Employee ID</ControlLabel>
            <FormControl type="text" ref="employee_id" placeholder="1234" required/>
          </FormGroup>

          <FormGroup controlId="company_code">
            <ControlLabel>Company Code</ControlLabel>
            <FormControl type="text" ref="company_code" placeholder="abcd" required/>
          </FormGroup>

          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" ref="password" placeholder="password" required/>
          </FormGroup>

          <ButtonToolbar>
            <Button type="submit" bsStyle="primary">Sign In</Button>
            <Button onClick={this.signUp.bind(this)}>Sign Up</Button>
            <Button bsStyle="link" onClick={this.googleLogin.bind(this)}>Login with Google</Button>
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
