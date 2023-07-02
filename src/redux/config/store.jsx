import { createStore } from 'redux';
import { combineReducers } from 'redux';
import userId from '../modules/UserId';
import userInfo from '../modules/UserInfo';
import userWrite from '../modules/UserWrite';
import LoginModule from '../modules/LoginModule';
import editDetail from '../modules/DetailInfo';
import loginsubmit from '../modules/loginEmail';

const rootReducer = combineReducers({
  userId,
  userInfo,
  userWrite,
  LoginModule,
  editDetail,
  loginsubmit,
});

const store = createStore(rootReducer);

export default store;
