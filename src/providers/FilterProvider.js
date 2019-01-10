import React, { Component } from "react";

const FilterContext = React.createContext();

class FilterProvider extends Component {
  constructor(){
    super();
    this.state = {
      selectedGraph: 'table',
      selectedCurrency: 'All',
      selectedLP: 'All'
    }
  }

  changeGraph(graph){
    this.setState({
      selectedGraph: graph 
    });
  }

  changeCurrency(currency){
    this.setState({
      selectedCurrency: currency
    });
  }

  changeLP(lp){
    this.setState({
      selectedLP: lp
    });
  }

  render(){
    return (
      <FilterContext.Provider value={{
          ...this.state,
          changeGraph: (graph)=>this.changeGraph(graph),
          changeCurrency: (currency)=>this.changeCurrency(currency),
          changeLP: (lp)=>this.changeLP(lp)
        }}>
        {this.props.children}
      </FilterContext.Provider>
    );
  }
}

const FilterConsumer = FilterContext.Consumer;

export {
  FilterProvider,
  FilterConsumer
}

