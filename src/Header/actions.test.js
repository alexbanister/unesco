import * as actions from './actions';

describe('Header Actionsw', () => {
  it('SET_REGIONS should take object return an action', () => {
    const regions = ['North America and Europe', 'Asia and the Pacific', 'Arab States'];
    const expected = { type: 'SET_REGIONS', regions };
    const expectation = actions.setRegions(regions);
    expect(expectation).toEqual(expected);
  });
  it('SET_COUNTRIES should take object return an action', () => {
    const countries = ['USA', 'Canada', 'Mexico'];
    const expected = { type: 'SET_COUNTRIES', countries };
    const expectation = actions.setCountries(countries);
    expect(expectation).toEqual(expected);
  });
});
