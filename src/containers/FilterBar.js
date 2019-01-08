import React, {Component} from 'react';
import axios from 'axios';
import {Button, Row, Input} from 'react-materialize';
import SelectionList from '../components/SelectionList';


class FilterBar extends Component {
  constructor(props) {
    super();
    this.state = {
      currencies: [],
      lps: [],
      currencySelected: props.defaultCurrency,
      lpSelected: props.defaultLP,      
    };

  }

  async componentDidMount() {
    const results = await axios.get('http://localhost:3000/charts/categories');
    const {currency:currencies, lp:lps} = results.data;

    this.setState({currencies, lps});

  }

  onCurrencyChange(value){
    this.setState({
      currencySelected: value
    });
  }

  onLPChange(value){
    this.setState({
      lpSelected: value
    });
  }  

  handleSubmit(event){
    event.preventDefault();
    
    const query = ({
      ...(this.state.currencySelected === 'All' || {currency: this.state.currencySelected}),
      ...(this.state.lpSelected === 'All' || {lp: this.state.lpSelected})
    });

    this.props.updateChartData(query);
    this.props.updateFilterSelection(this.state.currencySelected, this.state.lpSelected);

  }

  render() {
    
    return (
      <div className='mt-m'>
        <Row>
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <Input s={6}
                onChange={(e,value)=>this.onCurrencyChange(value)}
                type='select' 
                label='Currency'
                defaultValue='All'>
              <option value='All'>All</option>
              <SelectionList lists={this.state.currencies} />
            </Input>
            <Input s={6}
                onChange={(e,value)=>this.onLPChange(value)}
                type='select'
                label='LP'
                defaultValue='All'>
              <option value='All'>All</option>
              <SelectionList lists={this.state.lps} />
            </Input>
            <div className='center-align'>
              <Button className="green" waves='light'> Search</Button>
            </div>
          </form>
        </Row>
      </div>
    );
  }
};

export default FilterBar;