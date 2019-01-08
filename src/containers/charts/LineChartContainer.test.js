import React from 'react';
import {shallow} from 'enzyme';
import LineChartContainer from './LineChartContainer';

const defaultProps = {data:[]};

const setup = (props={})=>{
  const setupProps = {...defaultProps, ...props};
  return shallow(<LineChartContainer {...setupProps}/>);
};

it('renders without error', ()=>{
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
});

describe('componentWillReceivedProps', ()=>{
});




