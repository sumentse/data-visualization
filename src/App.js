import React, { Component } from 'react';
import '../node_modules/css-spaces/dist/spaces.min.css'
import axios from 'axios';
import Header from "./components/Header";
import VisualizationMenu from './containers/VisualizationMenu';
import {
  TableChartContainer, 
  LineChartContainer,
  AreaChartContainer
} from './containers/charts';
import FilterBar from './containers/FilterBar';
import {FilterProvider, FilterConsumer} from './providers/FilterProvider';

class App extends Component {

  constructor(){
    super();
    this.state = {
      chartData: [],
      paginationData: {}
    };
  }

  async componentDidMount(){
    const {data} = await axios.post(`http://localhost:3000/charts/filter?currentPage=0&pageSize=100`);
    this.setState({
      chartData: data.results,
      paginationData: data.pagination
    });
  }

  async updateChartData(query, pageSize=100, page=0){
    const {data} = await axios.post(`http://localhost:3000/charts/filter?currentPage=${page}&pageSize=${pageSize}`, {...query});
    this.setState({
      chartData: data.results,
      paginationData: data.pagination
    });
  };


  generateChart(context){
    const {selectedGraph, selectedCurrency, selectedLP} = context;
    switch(selectedGraph){
      case 'table':
        return (
          <TableChartContainer data={this.state.chartData} 
            count={this.state.paginationData.totalItems} 
            page={this.state.paginationData.currentPage - 1}
            updateChartDataCallBack={(query,pageSize,page)=>this.updateChartData(query,pageSize,page)}
            currency={selectedCurrency}
            lp={selectedLP}
          rowsPerPage={this.state.paginationData.pageSize}/>
        );
      case 'line':
        return (<LineChartContainer data={this.state.chartData} currency={selectedCurrency} lp={selectedLP}/>);
      case 'area':
        return (<AreaChartContainer data={this.state.chartData} currency={selectedCurrency} lp={selectedLP}/>);
      default:
        return (<div>Something went wrong</div>);
    }
  }

  render() {
    return (
      <FilterProvider>
        <FilterConsumer>
          {
            (context)=>(
              <div id="App" className="container-fluid">
                <Header brand="Coding Challege"/>
                <VisualizationMenu/>
                <FilterBar updateChartData={
                  (query)=>this.updateChartData(query)}
                  />
                {this.state.chartData.length > 0 ? this.generateChart(context) : ''}
              </div>              
            )
          }
        </FilterConsumer>
      </FilterProvider>
    );
  }
}

export default App;
