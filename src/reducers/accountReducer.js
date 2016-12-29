import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function accountReducer(state = initialState.accounts, action) {
  switch (action.type) {
    case types.LOAD_ACCOUNTS_SUCCESS:
      return action.accounts;

    case types.CREATE_ACCOUNT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.account)
      ];

    case types.UPDATE_ACCOUNT_SUCCESS:
      return [
        ...state.filter(account => account.id !== action.account.id),
        Object.assign({}, action.account)
      ];
    case types.DELETE_ACCOUNT_SUCCESS:
      return [
        ...state.filter(account => account.id !== action.accountId)
      ];

    default:
      return state;
  }
}
