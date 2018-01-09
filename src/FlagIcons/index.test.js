import { shallow } from 'enzyme';
import React from 'react';
import FlagIcons from './index';


describe('Card', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<FlagIcons />);

    expect(wrapper).toMatchSnapshot();
  });
});
