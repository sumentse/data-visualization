import React from 'react';
import {shallow} from 'enzyme';
import SelectionList from './SelectionList';

const defaultProps = {lists:[]};

const setup = (props)=>{
    const setupProps = {...defaultProps, ...props};
    return shallow(<SelectionList {...setupProps}/>);
};

it('renders without error', ()=>{
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
});

it('it should render rows when given props', ()=>{
    const wrapper = setup({lists:['a','b','c']});
    const rows = wrapper.find('option');
    expect(rows.length).toBe(3);
});


