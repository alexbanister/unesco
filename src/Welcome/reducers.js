/* eslint import/prefer-default-export: 0 */

export const user = (store = {}, action) => {
  switch (action.type) {
  case 'SET_USER_ID':
    return Object.assign({}, action.user);
  case 'CLEAR_USER_ID':
    return Object.assign({});
  default:
    return store;
  }
};
