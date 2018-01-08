import * as actions from './actions';

describe('Card Actions', () => {
  it('REMOVE_FLAG should take object and return an action', () => {
    const flagType = 'visited';
    const id = 1873;
    const flag = { flagType, id };
    const expected = { type: 'REMOVE_FLAG', flag };
    const expectation = actions.removeFlag(flag);
    expect(expectation).toEqual(expected);
  });
  it('ADD_FLAG should take object and return an action', () => {
    const flagType = 'visited';
    const id = 1873;
    const flag = { flagType, id };
    const expected = { type: 'ADD_FLAG', flag };
    const expectation = actions.addFlag(flag);
    expect(expectation).toEqual(expected);
  });
});
