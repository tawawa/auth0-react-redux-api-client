import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const AccountForm = ({account, onSave, onChange, onDelete, saving, deleting, errors}) => {

  // TODO - fix this so it works correctly...

  const trueFalse = [
    {
      value: "false",
      text: "false"
    },
    {
      value: "true",
      text: "true"
    }];

  return (
    <form>
      <h1>Manage Account</h1>
      <TextInput
        name="email"
        label="Email"
        value={account.email}
        onChange={onChange}
        error={errors.email}/>

      <TextInput
        name="password"
        label="Password"
        value={account.password}
        onChange={onChange}
        error={errors.password}/>

      <TextInput
        name="nickname"
        label="Nickname"
        value={account.nickname}
        onChange={onChange}
        error={errors.nickname}/>

      <SelectInput
        name="email_verified"
        label="Email Verified"
        value={account.email_verified}
        defaultOption="false"
        options={trueFalse}
        onChange={onChange} error={errors.email_verified}/>

      {/*<TextInput*/}
      {/*name="email_verified"*/}
      {/*label="Email Verified"*/}
      {/*value={account.email_verified}*/}
      {/*onChange={onChange}*/}
      {/*error={errors.email_verified}/>*/}

      <TextInput
        name="employee_id"
        label="Employee ID"
        value={account.employee_id}
        onChange={onChange}
        error={errors.employee_id}/>

      <TextInput
        name="company_code"
        label="Company Code"
        value={account.company_code}
        onChange={onChange}
        error={errors.company_code}/>


      <span className="btn-space">
          <input
            type="submit"
            disabled={saving}
            value={saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={onSave}/>
      </span>
      <span className="btn-space">
          <input
            type="submit"
            disabled={deleting}
            value={saving ? 'Deleting...' : 'Delete'}
            className="btn btn-danger"
            onClick={onDelete}/>
      </span>
    </form>
  );
};

AccountForm.propTypes = {
  account: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  deleting: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default AccountForm;
