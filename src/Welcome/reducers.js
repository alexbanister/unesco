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

export const questions = (store = [], action) => {
  switch (action.type) {
  case 'SAVE_QUESTIONS':
    return [...store, ...action.questions];
  default:
    return store;
  }
};

export const thing = (store = [], action) => {
  switch (action.type) {
  case 'THING':
    return [...store, ...action.questions];
  default:
    return store;
  }
};

