/* eslint import/prefer-default-export: 0 */

export const user = (store = '', action) => {
  switch (action.type) {
  case 'SET_USER_ID':
    return action.userId;
  case 'CLEAR_USER_ID':
    return '';
  default:
    return store;
  }
};
