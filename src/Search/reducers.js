export const search = (store = [], action) => {
  switch (action.type) {
  case 'SET_SEARCH':
    return action.search;
  default:
    return store;
  }
};