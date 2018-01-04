/* eslint import/prefer-default-export: 0 */

export const user = (store = {}, action) => {
  switch (action.type) {
  case 'SET_USER':
    return Object.assign({}, action.user);
  case 'CLEAR_USER':
    return Object.assign({});
  default:
    return store;
  }
};
export const sites = (store = [], action) => {
  switch (action.type) {
  case 'ADD_SITES':
    return [...action.sites];
  default:
    return store;
  }
};
