/**
 * this module will contain all action creators for the home component
 * all action creator should be exported and actionNames will contain the
 * action names for it.
 */
export const homeActionNames = {
  HOME_MY_PROJECTS: 'HOME_MY_PROJECTS',
  HOME_ADD_NEW_PROJECT: 'HOME_ADD_NEW_PROJECT',
};
/**
 * @function fetchMyProjects
 * @param {object} payload
 * @description this function is an action creater for my projects
 * will return all the projects as an redux action
 * @returns {object}
 */
export const fetchMyProjects = payload => (
  {
    type: homeActionNames.HOME_MY_PROJECTS,
    payload,
  }
);
/**
 * @function addNewProject
 * @param {object} payload
 * @description this function is an action to add a new project
 * will return all the projects as an redux action
 * @returns {object}
 */
export const addNewProject = payload => (
  {
    type: homeActionNames.HOME_ADD_NEW_PROJECT,
    payload,
  }
);
