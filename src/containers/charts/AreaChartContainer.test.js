import React from 'react';
import {shallow} from 'enzyme';
import AreaChartContainer from './AreaChartContainer';

const defaultProps = {data:[]};

const setup = (props={})=>{
  const setupProps = {...defaultProps, ...props};
  return shallow(<AreaChartContainer {...setupProps}/>);
};

it('renders without error', ()=>{
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
});

describe('componentWillReceivedProps', ()=>{
});




