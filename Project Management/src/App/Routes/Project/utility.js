import { ApiStore } from '../../services/index';

export const name = 'hannad';
/**
 * @function projectDetails
 * @description this function calls fetchProjectDetails function from
 * ApiStore which calls the project-details api
 * @returns {Promise}
 */
export const projectDetails = () =>
  ApiStore.fetchProjectDetails().then(
    success => Promise.resolve(success.data),
    error => Promise.reject(error),
  );
