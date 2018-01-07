import { loginAction, logoutAction, addSites } from './actions';

describe('Welcome actions', () => {
  it('should have an action to set a user', () => {
    const id = '7pNACovMQMp8IdDokuWo';
    const email = 'awesomeuser@gmail.com';
    const name = 'Awesome User';
    const mockUser = { id, email, name };
    const expected = { type: 'SET_USER', user: mockUser };
    const expectation = loginAction(mockUser);

    expect(expectation).toEqual(expected);
  });

  it('should have an action to clear a user', () => {
    const id = '7pNACovMQMp8IdDokuWo';
    const email = 'awesomeuser@gmail.com';
    const name = 'Awesome User';
    const mockUser = { id, email, name };
    const expected = { type: 'CLEAR_USER', user: mockUser };
    const expectation = logoutAction(mockUser);

    expect(expectation).toEqual(expected);
  });

  it('should have an action to add sites', () => {
    const mockSites = [
      { id: 1, name: 'The Grand Canyon' },
      { id: 2, name: 'Statue of Liberty' },
      { id: 3, name: 'Khangchendzonga National Park' },
      { id: 4, name: 'My Apartment' }
    ];
    const expected = { type: 'ADD_SITES', sites: mockSites };
    const expectation = addSites(mockSites);

    expect(expectation).toEqual(expected);
  });
});
