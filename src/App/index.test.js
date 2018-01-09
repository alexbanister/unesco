import React from 'react';
import { shallow } from 'enzyme';
import App from './index';


describe('App snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
