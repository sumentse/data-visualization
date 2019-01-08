import React, {Component} from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
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
    return this.state.data.filter(({currency})=>this.props.currency === currency)
      .map(({asking_price: askingPrice, bid_price: biddingPrice}) => {
        return {askingPrice, biddingPrice}
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
            <YAxis type="number" domain={['dataMin', 'dataMax']}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
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

export default LineChartContainer;