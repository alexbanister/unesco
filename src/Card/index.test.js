import { shallow } from 'enzyme';
import React from 'react';
import Card from './index';


describe('Card', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Card />);

    expect(wrapper).toMatchSnapshot();
  });
});
