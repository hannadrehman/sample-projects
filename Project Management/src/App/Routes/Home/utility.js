/**
 * this module will have all pure functions that are used in Home Component.
 * all complex logic that dosent belog in the controller should be kept in this file
 * in the form of functions. all api call functions must be written here
 */
import { ApiStore } from '../../services/index';

export const name = 'hannad';
/**
 * @function fetchProjects
 * @description this function calls fetchProjectsForAManager function from
 * ApiStore which calls the fetchProjects api
 * @returns {Promise}
 */
export const fetchProjects = managerId =>
  ApiStore.fetchProjectsForAManager(managerId).then(
    success => Promise.resolve(success.data),
    error => Promise.reject(error),
  );
/**
 * @function isEqual
 * @description this function checks weather old array is equal
 * to new arrays length. based on that it returns true/false
 * @returns {boolean}
 */
export const isEqual = (newArray, oldArray) => {
  if (newArray.length !== oldArray.length) {
    return false;
  }
  return true;
};
