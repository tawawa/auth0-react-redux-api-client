import React, {PropTypes} from 'react';
import AccountListRow from './AccountListRow';

const AccountList = ({accounts}) => {
  const visible = accounts && accounts.length;
  return (
    <div style={{display: visible ? 'block' : 'none'}}>
      <table className="table">
        <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Email</th>
          <th>Password</th>
          <th>Nickname</th>
          <th>Email Verified</th>
          <th>Employee ID</th>
          <th>Company Code</th>
        </tr>
        </thead>
        <tbody>
        {accounts.map(account =>
          <AccountListRow key={account.id} account={account}/>
        )}
        </tbody>
      </table>
    </div>
  );
};

AccountList.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default AccountList;
