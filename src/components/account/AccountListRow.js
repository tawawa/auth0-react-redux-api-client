import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AccountListRow = ({account}) => {
  return (
    <tr>
      <td>{account.authorId}</td>
      <td><Link to={'/account/' + account.id}>{account.email}</Link></td>
      <td>{account.password}</td>
      <td>{account.nickname}</td>
      <td>{account.email_verified}</td>
      <td>{account.employee_id}</td>
      <td>{account.company_code}</td>
    </tr>
  );
};

AccountListRow.propTypes = {
  account: PropTypes.object.isRequired
};

export default AccountListRow;
