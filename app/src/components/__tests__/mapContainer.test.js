/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import mapContainer from '../mapContainer';


describe('mapContainer test', () => {
  it('mapContainer should match snapshot', () => {
    const component = renderer.create(<mapContainer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
