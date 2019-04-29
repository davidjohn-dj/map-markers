/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../Map';
import { Spin } from 'antd';


describe('Map test', () => {
  it('Map should match snapshot', () => {
    const component = renderer.create(<Map
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBq5bd9aDDbWnOr8hEfyXTeTzHdIO82CL0"
      loadingElement={<Spin size="large" />}
    />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
