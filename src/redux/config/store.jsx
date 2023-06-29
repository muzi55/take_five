import { createStore } from "redux";
import { combineReducers } from "redux";
import userInfo from "../modules/UserInfo";

const rootReducer = combineReducers({
  userInfo,
});

const store = createStore(rootReducer);

export default store;
