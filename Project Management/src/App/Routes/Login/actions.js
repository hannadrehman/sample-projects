export const loginActionNames = {
  USER_LOGIN: 'USER_LOGIN',
};
/**
 * @function loginAction
 * @param {object} user
 * @description this function is an action creater for login
 * when user logs in this action is fired
 */
export const loginAction = user =>
  (
    {
      type: loginActionNames.USER_LOGIN,
      payload: user,
    }
  );

