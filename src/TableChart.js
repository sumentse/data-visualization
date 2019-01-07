import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  TableFooter,
  TablePagination
} from '@material-ui/core';

class TableChart extends Component {
  constructor(props){
    super();
    this.state = {
      data: [],
      count: 0
    };

  }

  //generates the table row
  generateRows(){
    return this.state.data.map((row, index)=>{
      const {
        currency, 
        time_stamp, 
        lp, 
        bid_price, 
        bid_quantity, 
        asking_price, 
        asking_quantity} = row;
      
      return (
        <TableRow key={index} className="tb-rows">
          <TableCell className="align-right">{currency}</TableCell>
          <TableCell className="align-right">{moment(time_stamp).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
          <TableCell className="align-right">{lp}</TableCell>
          <TableCell className="align-right">{bid_price}</TableCell>
          <TableCell className="align-right">{bid_quantity}</TableCell>
          <TableCell className="align-right">{asking_price}</TableCell>
          <TableCell className="align-right">{asking_quantity}</TableCell>
        </TableRow>
      );
    });
  }

  componentWillReceiveProps(nextProps){
    if(JSON.stringify(nextProps) !== JSON.stringify(this.props)){
      this.setState({
        data: nextProps.data,
        count: nextProps.count
      });
    }
  }
  
  render(){
    if(this.state.data.length === 0){
      return (
        <div className="center-align mt-xxxl">
          <CircularProgress/>
        </div>
      );
    } else {
      return(
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="align-right">Currency</TableCell>
              <TableCell className="align-right">Time</TableCell>
              <TableCell className="align-right">LP</TableCell>
              <TableCell className="align-right">Bid Price</TableCell>
              <TableCell className="align-right">Bid Quantity</TableCell>
              <TableCell className="align-right">Asking Price</TableCell>
              <TableCell className="align-right">Asking Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.generateRows()}
          </TableBody>
          <TableFooter>
            <TablePagination rowsPerPageOptions={[100, 500, 1000]}
              colSpan={7}
              count={this.props.count}
              rowsPerPage={100}
              onChangePage={this.handleChangePage}
              page={0}
            />
          </TableFooter>
        </Table>
      );
  
    }
  }
  
};

TableChart.propTypes = {
  data: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired
};

export default TableChart;