import { createStore } from 'redux';
import { combineReducers } from 'redux';
import editDetail from '../modules/DetailInfo';

const rootReducer = combineReducers({
  editDetail,
});

const store = createStore(rootReducer);

export default store;
