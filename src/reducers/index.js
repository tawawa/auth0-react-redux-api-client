import {combineReducers} from 'redux';
import accounts from './accountReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  accounts,
  ajaxCallsInProgress
});

export default rootReducer;
