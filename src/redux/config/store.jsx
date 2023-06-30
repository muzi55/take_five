import { createStore } from "redux";
import { combineReducers } from "redux";
import userInfo from "../modules/UserInfo";
import userWrite from "../modules/UserWrite";
import userPhoto from "../modules/UserPhoto";

const rootReducer = combineReducers({
  userInfo,
  userWrite,
  userPhoto,
});

const store = createStore(rootReducer);

export default store;
