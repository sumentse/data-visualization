import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  ResponsiveContainer,
  AreaChart, 
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

class AreaChartContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({data: nextProps.data});
    }
  }

  formatData() {
    return this.state.data
      .map(({
          time_stamp: time, 
          asking_price: askingPrice, 
          asking_quantity: askingQuantity,
          bid_price: biddingPrice,
          bid_quantity: biddingQuantity
        }) => {
        return {
          time:moment(time).format('HH:mm:ss'), 
          askingPrice,
          askingQuantity, 
          biddingPrice,
          biddingQuantity
        }
      });
  }

  render() {

    if(this.props.currency === 'All' || this.props.lp === 'All'){
      return (
        <div>
          Please select the filters then select Search...
        </div>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={this.formatData()}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="time" textAnchor="end" angle={-45} height={75}/>
            <YAxis type="number" domain={['dataMin', 9152020]} textAnchor="end" angle={-45} height={75}/>
            <Tooltip/>
            <Legend verticalAlign="top" height={36}/>
            <Area type='monotone' dataKey='askingPrice' stackId="1" stroke='#8884d8' fill='#8884d8' />
            <Area type='monotone' dataKey='askingQuantity' stackId="1" stroke='#ffc658' fill='#ffc658' />
            <Area type='monotone' dataKey='biddingPrice' stackId="1" stroke='#ffc658' fill='#ffc658' />
            <Area type='monotone' dataKey='biddingQuantity' stackId="1" stroke='#8884d8' fill='#82ca9d' />
        </AreaChart>
        </ResponsiveContainer>
      );
    }

  }
};

AreaChartContainer.propTypes = {
  data: PropTypes.array.isRequired
};

export default AreaChartContainer;