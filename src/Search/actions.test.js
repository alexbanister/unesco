import * as actions from './actions';

describe('Search Actions', () => {
  it('SET_SEARCH should take object return an action', () => {
    const search = 'grand';
    const expected = { type: 'SET_SEARCH', search };
    const expectation = actions.setSearch(search);

    expect(expectation).toEqual(expected);
  });
});
