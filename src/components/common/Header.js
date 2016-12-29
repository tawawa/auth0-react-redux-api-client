import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import AuthService from './../../utils/AuthService';
import {loadAccounts} from './../../actions/accountActions';


class Header extends React.Component {

  onLogout(e) {
    e.preventDefault();
    const {auth} = this.props;
    this.props.auth.logout();
    this.context.router.push('/login');
  }

  onAccounts(e) {
    e.preventDefault();
    this.context.store.dispatch(loadAccounts());
    setTimeout(() => {
      this.context.router.push('/accounts');
    }, 500);
  }

  render() {
    const { router } = this.context;
    const visible = !router.isActive('/login');
    const {loading} = this.props;
    return (
      <div style={{display: visible ? 'block' : 'none'}}>
        <nav>
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/accounts" onClick={this.onAccounts.bind(this)} activeClassName="active">Accounts</Link>
          {" | "}
          <Link to="/login" onClick={this.onLogout.bind(this)} activeClassName="active">Logout</Link>
          {loading && <LoadingDots interval={100} dots={20}/>}
        </nav>
      </div>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object,
  store: React.PropTypes.object
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.instanceOf(AuthService)
};

export default Header;
