export const loginAction = userId => ({
  type: 'SET_USER_ID',
  userId
});

export const logoutAction = userId => ({
  type: 'CLEAR_USER_ID',
  userId
});

// export const saveQuestions = (questions) => {
//   return {
//     type: 'SAVE_QUESTIONS',
//     questions
//   };
// };
// export const saveResponse = (response) => {
//   return {
//     type: 'SAVE_RESPONSE',
//     response
//   };
// };
