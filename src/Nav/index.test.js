import { shallow } from 'enzyme';
import React from 'react';
import Nav from './index';


describe('Nav', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Nav />);

    expect(wrapper).toMatchSnapshot();
  });
});