import React, { Component } from 'react';
import './App.css';
import '../node_modules/css-spaces/dist/spaces.min.css'
import axios from 'axios';
import FilterBar from './FilterBar';
import Header from "./Header";
import TableChart from './TableChart';

class App extends Component {

  constructor(){
    super();
    this.state = {
      chartData: [],
      chartType: 'table',
      paginationData: {}
    };
  }

  async componentDidMount(){
    const {data} = await axios.post('http://localhost:3000/charts/filter?currentPage=1&pageSize=100')
    this.setState({
      chartData: data.results,
      paginationData: data.pagination
    });
  }

  async updateChartData(query){
    const {data} = await axios.post('http://localhost:3000/charts/filter?currentPage=1&pageSize=100', {...query});
    this.setState({
      chartData: data.results,
      paginationData: data.pagination
    });
  };

  generateChart(){
    switch(this.state.chartType){
      case 'table':
        return (<TableChart data={this.state.chartData} count={this.state.paginationData.totalItems}/>);
      default:
        return (<TableChart data={this.state.chartData}/>); 
    }
  }

  render() {
    return (
      <div id="App" className="container-fluid">
        <Header brand="Coding Challege"/>
        <FilterBar updateChartData={(query)=>this.updateChartData(query)}/>
        {this.generateChart()}
      </div>
    );
  }
}

export default App;
