import { createStore } from 'redux';
import { combineReducers } from 'redux';
import LoginModule from '../modules/LoginModule';

const rootReducer = combineReducers({
  LoginModule,
});

const store = createStore(rootReducer);

export default store;
