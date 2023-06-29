import { createStore } from 'redux';
import { combineReducers } from 'redux';
import lists from '../modules/modules';
const rootReducer = combineReducers({
  // 여기서 부터 추가 !!
  lists,
  
});

const store = createStore(rootReducer);

export default store;
