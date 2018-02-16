/**
* @function  projectReducer
* @type reducer
*/
import { projectActionNames } from './actions';
import { cardActionNames } from './ListTile/Card/actions';
import { listTileActionNames } from './ListTile/actions';

const defaultState = {
  projectDetails: {},
};

const projectReducer = (state = defaultState, actions) => {
  switch (actions.type) {
    case projectActionNames.PROJECT_DETAILS:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          [actions.projectId]: actions.payload,
        },
      };
    case projectActionNames.PROJECT_ADD_LIST:
      return {
        ...state,
        projectDetails: {
          ...state.projectDetails,
          [actions.projectId]: [...state.projectDetails[actions.projectId], actions.payload],
        },
      };
    case cardActionNames.CARD_DETAILS:
      return {
        // copy state
        ...state,
        projectDetails: {
          // copy project details
          ...state.projectDetails,
          // check dynamic property projectid.
          // find list and taks and update it
          [actions.projectId]: state.projectDetails[actions.projectId].map((current) => {
            const newList = { ...current };
            let newTasksList = newList.tasks;

            if (newList.id === actions.listId) {
              newTasksList = newTasksList.map((task) => {
                let newTask = { ...task };
                if (task.id === actions.taskId) {
                  newTask = actions.payload;
                }
                return newTask;
              });
              newList.tasks = newTasksList;
              return newList;
            }
            return newList;
          }),
        },
      };
    case cardActionNames.CARD_DELETE:
      return {
        // copy state
        ...state,
        projectDetails: {
          // copy project details
          ...state.projectDetails,
          // check dynamic property projectid.
          // find list and taks and update it
          [actions.projectId]: state.projectDetails[actions.projectId].map((current) => {
            const newList = { ...current };
            let newTasksList = newList.tasks;

            if (newList.id === actions.listId) {
              newTasksList = newTasksList.filter(task => task.id !== actions.taskId);
              newList.tasks = newTasksList;
              return newList;
            }
            return newList;
          }),
        },
      };
    case listTileActionNames.LISTTILE_DETAILS:
      return {
        // copy state
        ...state,
        projectDetails: {
          // copy project details
          ...state.projectDetails,
          // check dynamic property projectid.
          // find list and taks and update it
          [actions.projectId]: state.projectDetails[actions.projectId].map((current) => {
            let newList = { ...current };
            if (newList.id === actions.listId) {
              newList = actions.payload;
            }
            return newList;
          }),
        },
      };
    case listTileActionNames.LISTTILE_SAVE_NEW_TASK:
      return {
        // copy state
        ...state,
        projectDetails: {
          // copy project details
          ...state.projectDetails,
          // check dynamic property projectid.
          // find list and taks and update it
          [actions.projectId]: state.projectDetails[actions.projectId].map((current) => {
            const newList = { ...current };

            if (newList.id === actions.listId) {
              newList.tasks.push(actions.payload);
            }
            return newList;
          }),
        },
      };
    case listTileActionNames.LISTTILE_DELETE_LIST:
      return {
        // copy state
        ...state,
        projectDetails: {
          // copy project details
          ...state.projectDetails,
          // check dynamic property projectid.
          // find list and taks and update it
          [actions.projectId]: state.projectDetails[actions.projectId].filter((current) => {
            const newList = { ...current };
            return newList.id !== actions.listId;
          }),
        },
      };
    default:
      return state;
  }
};

export default projectReducer;
