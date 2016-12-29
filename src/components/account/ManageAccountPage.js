import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as accountActions from '../../actions/accountActions';
import AccountForm from './AccountForm';
import toastr from 'toastr';

export class ManageAccountPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      account: Object.assign({}, props.account),
      errors: {},
      saving: false
    };

    this.updateAccountState = this.updateAccountState.bind(this);
    this.saveAccount = this.saveAccount.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps.account is null after a delete operation
    if (!nextProps.account) {
      return;
    } else if (this.props.account.id != nextProps.account.id) {
      // Necessary to populate form when existing account is loaded directly.
      this.setState({account: Object.assign({}, nextProps.account)});
    }
  }

  updateAccountState(event) {
    const field = event.target.name;
    let account = this.state.account;
    account[field] = event.target.value;
    return this.setState({account: account});
  }

  accountFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.account.email.length < 5) {
      errors.title = 'Email must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveAccount(event) {
    event.preventDefault();

    if (!this.accountFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveAccount(this.state.account)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  deleteAccount(event) {
    event.preventDefault();

    this.setState({deleting: true});

    this.props.actions.deleteAccount(this.state.account.id)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({deleting: false});
      });
  }

  redirect() {
    const saved = this.state.saving;
    const deleted = this.state.deleting;
    this.setState({saving: false});
    this.setState({deleting: false});

    if (saved) {
      toastr.success('Account saved');
    } else if (deleted) {
      toastr.success('Account deleted');
    }
    this.context.router.push('/accounts');
  }

  render() {
    return (
      <AccountForm
        onChange={this.updateAccountState}
        onSave={this.saveAccount}
        onDelete={this.deleteAccount}
        account={this.state.account}
        errors={this.state.errors}
        saving={this.state.saving}
        deleting={this.state.deleting}
      />
    );
  }
}

ManageAccountPage.propTypes = {
  account: PropTypes.object,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageAccountPage.contextTypes = {
  router: PropTypes.object
};

function getAccountById(accounts, id) {
  const account = accounts.filter(account => account.id == id);
  if (account.length) return account[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const accountId = ownProps.params.id; // from the path `/account/:id`

  let account = {id: '', email: '', password: '', nickname: '', email_verified: '', employee_id: '', company_code: ''};

  if (accountId && state.accounts.length > 0) {
    account = getAccountById(state.accounts, accountId);
  }

  return {
    account: account
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountPage);
