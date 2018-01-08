import { shallow } from 'enzyme';
import React from 'react';
import SiteList from './index';


describe('SiteList', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<SiteList />);

    expect(wrapper).toMatchSnapshot();
  });
});