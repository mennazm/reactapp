// src/reducers/index.js
import { combineReducers } from 'redux';
import examReducer from './examReducer';

const rootReducer = combineReducers({
  exam: examReducer,
});

export default rootReducer;
