import React from 'react';
import {shallow} from 'enzyme';
import TableChartContainer from './TableChartContainer';

const defaultProps = {data:[]};

const setup = (props={})=>{
  const setupProps = {...defaultProps, ...props};
  return shallow(<TableChartContainer {...setupProps}/>);
};

it('renders without error', ()=>{
  const wrapper = setup();
  expect(wrapper.length).toBe(1);
});

describe('componentWillReceivedProps', ()=>{
  it('renders the table row length correctly', ()=>{
    const wrapper = setup({data:[]});
  
    wrapper.setProps({
      data: [
        {
          "_id": "f7a6a4f2-aa22-45f1-969e-6b8b41a1eb12",
          "currency": "USD/MXN",
          "time_stamp": "2018-12-06T13:15:27.113Z",
          "lp": "LP3",
          "bid_price": 20571300,
          "bid_quantity": 100000000,
          "asking_price": 20581100,
          "asking_quantity": 100000000
        },
        {
          "_id": "b817c8ec-4a16-49f5-895b-45a54078e575",
          "currency": "USD/MXN",
          "time_stamp": "2018-12-06T13:15:27.114Z",
          "lp": "LP5",
          "bid_price": 20570600,
          "bid_quantity": 100000000,
          "asking_price": 20589500,
          "asking_quantity": 100000000
        },
        {
          "_id": "7aa97e54-6708-4322-b368-a08264f81c71",
          "currency": "USD/MXN",
          "time_stamp": "2018-12-06T13:15:27.114Z",
          "lp": "LP5",
          "bid_price": 20571000,
          "bid_quantity": 100000000,
          "asking_price": 20589500,
          "asking_quantity": 100000000
        }
      ]
    })
  
    const tableRows = wrapper.find('.tb-rows');
    
    expect(tableRows.length).toBe(3);
    
  });
});




