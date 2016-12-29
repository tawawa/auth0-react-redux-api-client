import * as types from './actionTypes';
import accountApi from '../api/accountApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAccountsSuccess(accounts) {
  return { type: types.LOAD_ACCOUNTS_SUCCESS, accounts};
}

export function createAccountSuccess(account) {
  return {type: types.CREATE_ACCOUNT_SUCCESS, account};
}

export function updateAccountSuccess(account) {
  return {type: types.UPDATE_ACCOUNT_SUCCESS, account};
}

export function deleteAccountSuccess(accountId) {
  return {type: types.DELETE_ACCOUNT_SUCCESS, accountId};
}

export function loadAccounts() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return accountApi.getAllAccounts().then(accounts => {
      dispatch(loadAccountsSuccess(accounts));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveAccount(account) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return accountApi.saveAccount(account).then(account => {
      account.id ? dispatch(updateAccountSuccess(account)) :
        dispatch(createAccountSuccess(account));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteAccount(accountId) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return accountApi.deleteAccount(accountId).then((accountId) => {
        dispatch(deleteAccountSuccess(accountId));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
