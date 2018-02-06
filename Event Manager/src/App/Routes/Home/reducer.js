import { homeActions } from './actions';

const initialState = {
  eventList: [],
};


const homeReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case homeActions.SAVE_EVENT:
      return {
        ...state,
        eventList: [...state.eventList, actions.payload],
      };
    default:
      return state;
  }
};

export default homeReducer;
