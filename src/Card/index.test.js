import { shallow } from 'enzyme';
import React from 'react';
import Welcome from './index';


describe('Card', () => {
  it.skip('should always match the snapshot', () => {
    const wrapper = shallow(<Welcome />);

    expect(wrapper).toMatchSnapshot();
  });
});