import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as accountActions from '../../actions/accountActions';
import AccountList from './AccountList';
import {browserHistory} from 'react-router';

class AccountsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddAccountPage = this.redirectToAddAccountPage.bind(this);
  }

  accountRow(account, index) {
    return <div key={index}>{account.title}</div>;
  }

  redirectToAddAccountPage() {
    browserHistory.push('/account');
  }

  render() {
    const {accounts} = this.props;

    return (
      <div>
        <h1>Accounts</h1>
        <input type="submit"
               value="Add Account"
               className="btn btn-primary"
               onClick={this.redirectToAddAccountPage}/>
        <AccountList accounts={accounts}/>
      </div>
    );
  }
}

AccountsPage.propTypes = {
  accounts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
