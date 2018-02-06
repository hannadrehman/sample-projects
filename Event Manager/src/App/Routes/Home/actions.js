
export const homeActions = {
  SAVE_EVENT: 'SAVE_EVENT',
};

export const saveEvent = payload => ({
  type: 'SAVE_EVENT',
  payload,
});
