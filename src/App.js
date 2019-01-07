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
      chartType: 'table'
    };
  }

  async componentDidMount(){
    const {data} = await axios.post('http://localhost:3000/charts/filter?currentPage=1&pageSize=100')
    
    this.setState({
      chartData: data.results
    });
  }

  generateChart(){
    switch(this.state.chartType){
      case 'table':
        return (<TableChart data={this.state.chartData}/>);
      default:
        return (<TableChart data={this.state.chartData}/>); 
    }
  }

  render() {
    return (
      <div id="App" className="container-fluid">
        <Header brand="Coding Challege"/>
        <FilterBar/>
        {this.generateChart()}
      </div>
    );
  }
}

export default App;
