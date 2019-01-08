import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

class LineChartContainer extends Component {
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
      .map(({time_stamp:time, asking_price: askingPrice, bid_price: biddingPrice}) => {
        return {
          time:moment(time).format('HH:mm:ss'), 
          askingPrice, 
          biddingPrice
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
          <LineChart
            data={this.formatData()}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
            <XAxis dataKey="time" textAnchor="end" angle={-45} height={75}/>
            <YAxis type="number" domain={['dataMin', 'dataMax']}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend verticalAlign="top" height={36}/>
            <Line
              type="monotone"
              dataKey="askingPrice"
              stroke="#8884d8"
              activeDot={{
              r: 5
            }}/>
            <Line
              type="monotone"
              dataKey="biddingPrice"
              stroke="#82ca9d"
              activeDot={{
              r: 5
            }}/>
          </LineChart>
        </ResponsiveContainer>
      );
    }

  }
};

LineChartContainer.propTypes = {
  data: PropTypes.array.isRequired
};

export default LineChartContainer;