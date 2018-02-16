/**
* @function  homeReducer
* @type reducer
*/
import { homeActionNames } from './actions';

const defaultState = {
  projects: [],
};

const homeReducer = (state = defaultState, actions) => {
  switch (actions.type) {
    case homeActionNames.HOME_MY_PROJECTS:
      return {
        ...state,
        projects: [...state.projects, ...actions.payload],
      };
    case homeActionNames.HOME_ADD_NEW_PROJECT:
      return {
        ...state,
        projects: [...state.projects, actions.payload],
      };
    default:
      return state;
  }
};

export default homeReducer;
