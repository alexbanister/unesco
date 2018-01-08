import { shallow } from 'enzyme';
import React from 'react';
import Dashboard from './index';

describe('Dashboard', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Dashboard />);

    expect(wrapper).toMatchSnapshot();
  });
});