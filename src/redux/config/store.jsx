
import { createStore } from "redux";
import { combineReducers } from "redux";
import userInfo from "../modules/UserInfo";
import userWrite from "../modules/UserWrite";
import userPhoto from "../modules/UserPhoto";
import LoginModule from '../modules/LoginModule';

const rootReducer = combineReducers({
  userInfo,
  userWrite,
  userPhoto,
  LoginModule,

});

const store = createStore(rootReducer);

export default store;
