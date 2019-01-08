import React from 'react';
import {shallow} from 'enzyme';
import FilterBar from './FilterBar';

const setup = (props)=>{
  return shallow(<FilterBar {...props}/>);
};

it('renders without error', ()=>{
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
});


