/* eslint import/prefer-default-export: 0 */

export const user = (store = {}, action) => {
  switch (action.type) {
  case 'SET_USER':
    return Object.assign({}, action.user);
  case 'CLEAR_USER':
    return Object.assign({});
  case 'REMOVE_FLAG':
    const flag = store[action.flag.flagType].filter(item => item !== action.flag.id);
    return Object.assign({}, store, { [action.flag.flagType]: flag });
  case 'ADD_FLAG':
    return Object.assign(
      {},
      store,
      { [action.flag.flagType]: [...store[action.flag.flagType], action.flag.id] }
    );
    case 'SET_SEARCH':
      return Object.assign({}, store, { search: action.search });
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
