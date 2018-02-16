export const projectActionNames = {
  PROJECT_DETAILS: 'PROJECT_DETAILS',
  PROJECT_ADD_LIST: 'PROJECT_ADD_LIST',
};
/**
 * @function projectsDetails
 * @param {object} payload
 * @description this function is an action creater for project details
 * will return all the project details as an redux action
 * @returns {object}
 */
export const projectsDetailsAction = (payload, pid) => (
  {
    type: projectActionNames.PROJECT_DETAILS,
    payload,
    projectId: pid,
  }
);
/**
 * @function addNewList
 * @param {object} payload
 * @param {pid} number
 * @param {tid} number
 * @description this function is an action creater for add new task List
 * will return all the card details as an redux action
 * @returns {object}
 */
export const addNewList = (payload, pid) => (
  {
    type: projectActionNames.PROJECT_ADD_LIST,
    payload,
    projectId: pid,
  }
);
