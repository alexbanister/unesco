import * as reducers from './reducers';

describe('Header Reducers', () => {
  it('should pass a regions object action', () => {
    const regionsList = ['Africa', 'North America', 'Europe'];
    const action = { type: 'SET_REGIONS', regions: regionsList };
    const expected = reducers.regions(regionsList, action);
    const expectation = action.regions;
    expect(expected).toEqual(expectation);
  });
  it('should pass a countries object action', () => {
    const countryList = ['Brazil', 'Cuba', 'Spain'];
    const action = { type: 'SET_COUNTRIES', regions: countryList };
    const expected = reducers.regions(countryList, action);
    const expectation = action.regions;
    expect(expected).toEqual(expectation);
  });
});
