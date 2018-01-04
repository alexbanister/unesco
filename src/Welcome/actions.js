export const loginAction = user => ({
  type: 'SET_USER',
  user
});

export const logoutAction = user => ({
  type: 'CLEAR_USER',
  user
});

export const addSites = sites => ({
  type: 'ADD_SITES',
  sites
});
