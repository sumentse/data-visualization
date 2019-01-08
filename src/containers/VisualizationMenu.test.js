import React from 'react';
import {shallow} from 'enzyme';
import VisualizationMenu from './VisualizationMenu';

const setup = (props)=>{
  return shallow(<VisualizationMenu {...props}/>);
};

it('renders without error', ()=>{
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
});


