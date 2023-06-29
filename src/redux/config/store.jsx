import { createStore } from "redux";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  // 여기서 부터 추가 !!
});

const store = createStore(rootReducer);

export default store;
