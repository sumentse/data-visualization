import React, { Component } from 'react';
import './App.css';
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

class App extends Component {

  constructor(){
    super();
    this.state = {
      chartData: [],
      chartType: 'table',
      paginationData: {},
      selectedCurrency: 'All',
      selectedLP: 'All'
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

  updateFilterSelection(currency, lp){
    this.setState({
      selectedCurrency: currency,
      selectedLP: lp
    });
  }

  changeChartType(chartType){
    this.setState({
      chartType
    });
  }

  generateChart(){
    
    switch(this.state.chartType){
      case 'table':
        return (
          <TableChartContainer data={this.state.chartData} 
            count={this.state.paginationData.totalItems} 
            page={this.state.paginationData.currentPage - 1}
            updateChartDataCallBack={(query,pageSize,page)=>this.updateChartData(query,pageSize,page)}
            currency={this.state.selectedCurrency}
            lp={this.state.selectedLP}
          rowsPerPage={this.state.paginationData.pageSize}/>
        );
      case 'line':
        return (<LineChartContainer data={this.state.chartData} currency={this.state.selectedCurrency} lp={this.state.selectedLP}/>);
      case 'area':
        return (<AreaChartContainer data={this.state.chartData} currency={this.state.selectedCurrency} lp={this.state.selectedLP}/>);
      default:
        return (<div>Something went wrong</div>);
    }
  }

  render() {
    return (
      <div id="App" className="container-fluid">
        <Header brand="Coding Challege"/>
        <VisualizationMenu 
          changeChartCallback={(chartType)=>this.changeChartType(chartType)}
        />
        <FilterBar 
          updateChartData={(query)=>this.updateChartData(query)}
          defaultCurrency={this.state.selectedCurrency}
          defaultLP={this.state.selectedLP}
          updateFilterSelection={(currency,lp) => this.updateFilterSelection(currency,lp)}
          />
        {this.state.chartData.length !== 0 ? this.generateChart() : ''}
      </div>
    );
  }
}

export default App;
