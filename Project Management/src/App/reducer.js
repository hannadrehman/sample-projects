/**
 * this module will contain App reducer [reducer for root]
 * all reducers in each category will be combined here and exported from here.
 * categories/directories
 * 1.App
 * 2.common
 * 3.elements
 * 4.rouetes
 * each of these directories will have their own combined reducers which will further
 * go down to their folders.
 */
import { combineReducers } from 'redux';
import { loginActionNames } from './Routes/Login/actions';
import routeReducer from './Routes/reducer';

const defaultState = {
  user: {
    name: '',
    id: null,
    role: '',
  },
};
const appReducer = (state = defaultState, actions) => {
  switch (actions.type) {
    case loginActionNames.USER_LOGIN:
      return {
        ...state,
        user: actions.payload,
      };
    default:
      return state;
  }
};
export default combineReducers({
  app: appReducer,
  routes: routeReducer,
});
