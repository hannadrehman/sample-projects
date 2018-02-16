export const cardActionNames = {
  CARD_DETAILS: 'CARD_DETAILS',
  CARD_DELETE: 'CARD_DELETE',

};
/**
 * @function cardsDetailsAction
 * @param {object} payload
 * @param {pid} number
 * @param {tid} number
 * @description this function is an action creater for card details
 * will return all the card details as an redux action
 * @returns {object}
 */
export const cardsDetailsAction = (payload, pid, lid, tid) => (
  {
    type: cardActionNames.CARD_DETAILS,
    payload,
    projectId: pid,
    taskId: tid,
    listId: lid,
  }
);
/**
 * @function deleteNewTaskAction
 * @param {object} payload
 * @param {pid} number
 * @param {tid} number
 * @description this function is an action creater for delete a task
 * will return all the card details as an redux action
 * @returns {object}
 */
export const deleteNewTaskAction = (pid, lid, tid) => (
  {
    type: cardActionNames.CARD_DELETE,
    projectId: pid,
    listId: lid,
    taskId: tid,
  }
);
