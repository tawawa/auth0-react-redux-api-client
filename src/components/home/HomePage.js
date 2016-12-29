import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Auth0 Sample API Client</h1>
        <p>This is the landing page..</p>
        <Link to="accounts" className="btn btn-primary btn-lg">Manage Accounts</Link>
      </div>
    );
  }
}

export default HomePage;
