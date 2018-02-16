/**
 * this module will import all reducers from Route categor and combine and
 * and return them.
 */
import { combineReducers } from 'redux';

import homeReducer from './Home/reducer';
import projectReducer from './Project/reducer';


export default combineReducers({
  home: homeReducer,
  project: projectReducer,
});
