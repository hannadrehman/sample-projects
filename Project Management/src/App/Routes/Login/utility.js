/**
 * this module will have all pure functions that are used in Login Component.
 * all complex logic that dosent belog in the controller should be kept in this file
 * in the form of functions. all api call functions must be written here
 */
import { ApiStore } from '../../services';
/**
 * @function loginAction
 * @description this function calls doLogin function from
 * ApiStore which calls the loginApi
 * @returns {Promise}
 */
export const doLogin = () => ApiStore.login().then(
  success => Promise.resolve(success.data),
  error => Promise.reject(error),
);
/**
 * @function findUser
 * @param {string} userName
 * @param {array} allUsers
 * @description this function is used to find a user with username
 * from an array of users and returns the same user object
 * @returns {object} user
 */
export const findUser = (userName, allUsers) => allUsers.find(current =>
  current.name.toLowerCase() === userName.toLowerCase());

  /**
 * @function authorize
 * @param {string} userName
 * @param {array} allUsers
 * @description this function checks weather the user is authorized or not
 * and returns boolean true/false. if user is present in the results from api
 * we consider him as valid user
 * @returns {boolean}
 */
export const authorize = (user, authorized) => {
  const validUser = findUser(user, authorized);
  return validUser && validUser.name;
};
