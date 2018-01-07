export const regions = (store = '', action) => {
  switch (action.type) {
  case 'SET_REGIONS':
    return action.regions;
  default:
    return store;
  }
};

export const countries = (store = '', action) => {
  switch (action.type) {
  case 'SET_COUNTRIES':
    return action.countries;
  default:
    return store;
  }
};