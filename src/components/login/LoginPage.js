import React, {PropTypes} from 'react';
import {Jumbotron, ButtonToolbar, Button} from 'react-bootstrap';
import AuthService from './../../utils/AuthService';

class LoginPage extends React.Component {
  render() {
    const {auth} = this.props;
    return (
      <Jumbotron>
        <h2 className="main_title">
          <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
        </h2>
        <div className="login_root">
          <h2>Login</h2>
          <ButtonToolbar className="login_toolbar">
            <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
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
