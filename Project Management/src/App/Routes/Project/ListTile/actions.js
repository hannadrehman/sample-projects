export const listTileActionNames = {
  LISTTILE_DETAILS: 'LISTTILE_DETAILS',
  LISTTILE_SAVE_NEW_TASK: 'LISTTILE_SAVE_NEW_TASK',
  LISTTILE_DELETE_LIST: 'LISTTILE_DELETE_LIST',
};
/**
 * @function listTileAction
 * @param {object} payload
 * @param {pid} number
 * @param {tid} number
 * @description this function is an action creater for card details
 * will return all the card details as an redux action
 * @returns {object}
 */
export const listTileAction = (payload, pid, lid) => (
  {
    type: listTileActionNames.LISTTILE_DETAILS,
    payload,
    projectId: pid,
    listId: lid,
  }
);
/**
 * @function saveNewTaskAction
 * @param {object} payload
 * @param {pid} number
 * @param {tid} number
 * @description this function is an action creater for save new task
 * will return all the card details as an redux action
 * @returns {object}
 */
export const saveNewTaskAction = (payload, pid, lid) => (
  {
    type: listTileActionNames.LISTTILE_SAVE_NEW_TASK,
    payload,
    projectId: pid,
    listId: lid,
  }
);
/**
 * @function deleteList
 * @param {pid} number
 * @param {lid} number
 * @description this function is an action creater for add new task List
 * will return all the card details as an redux action
 * @returns {object}
 */
export const deleteList = (pid, lid) => (
  {
    type: listTileActionNames.LISTTILE_DELETE_LIST,
    projectId: pid,
    listId: lid,
  }
);
