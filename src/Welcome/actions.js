export const loginAction = user => ({
  type: 'SET_USER_ID',
  user
});

export const logoutAction = user => ({
  type: 'CLEAR_USER_ID',
  user
});
