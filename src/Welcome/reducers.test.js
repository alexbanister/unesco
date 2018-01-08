import * as reducers from './reducers';

describe('Welcome Reducer', () => {
  it('should pass a user data object action', () => {
    const id = '7pNACovMQMp8IdDokuWo';
    const email = 'awesomeuser@gmail.com';
    const name = 'Awesome User';
    const mockUser = { id, email, name };
    const action = { type: 'SET_USER', user: mockUser };
    const expectation = action.user;
    const expected = reducers.user(mockUser, action);

    expect(expectation).toEqual(expected);
  });
  it('should pass a clear user data object action', () => {
    const id = '7pNACovMQMp8IdDokuWo';
    const email = 'awesomeuser@gmail.com';
    const name = 'Awesome User';
    const mockUser = { id, email, name };
    const action = { type: 'CLEAR_USER', user: mockUser };
    const expectation = {};
    const expected = reducers.user(mockUser, action);

    expect(expectation).toEqual(expected);
  });
  it.skip('should pass an add flag data object action', () => {
    const flagType = 'visited';
    const id = 1873;
    const flag = { flagType, id };
    const action = { type: 'ADD_FLAG', flag };

    const expectation = action.flag;
    const expected = reducers.user(flag, action.flag);

    expect(expectation).toEqual(expected);
  });
  it.skip('should pass a remove flag data object action', () => {
    const flagType = 'visited';
    const id = 1873;
    const flag = { flagType, id };
    const action = { type: 'REMOVE_FLAG', flag };

    const expectation = action.flag;
    const expected = reducers.user(flag, action.flag);

    expect(expectation).toEqual(expected);
  });
  it('should pass a set search term string data action', () => {
    const search = 'grand';
    const action = { type: 'SET_SEARCH', search };
    const expectation = action.search;
    const expected = reducers.user(search, action.search);

    expect(expectation).toEqual(expected);
  });
  it('should pass sites data array action', () => {
    const sites = [
      { id: 1, name: 'The Grand Canyon' },
      { id: 2, name: 'Statue of Liberty' },
      { id: 3, name: 'Khangchendzonga National Park' },
      { id: 4, name: 'My Apartment' }
    ];
    const action = { type: 'ADD_SITES', sites };
    const expectation = action.sites;
    const expected = reducers.user(sites, action);

    expect(expectation).toEqual(expected);
  });
});
