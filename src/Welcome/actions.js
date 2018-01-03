export const loginAction = userId => ({
  type: 'SET_USER_ID',
  userId
});

export const logoutAction = userId => ({
  type: 'CLEAR_USER_ID',
  userId
});
