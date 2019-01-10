import React, {Component} from 'react';
import {FilterConsumer} from '../providers/FilterProvider';
import axios from 'axios';
import {Row, Input} from 'react-materialize';
import SelectionList from '../components/SelectionList';
import {Button, MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: '#fff',
        '&:focus': {
          background: green[800]
        }
      },
    }
  }
});

class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      lps: []
    };

  }

  async componentDidMount() {
    //get the select lists
    const results = await axios.get('http://localhost:3000/charts/categories');
    const {currency:currencies, lp:lps} = results.data;

    this.setState({currencies, lps});

  }

  handleSubmit(event, selectedCurrency, selectedLP){
    event.preventDefault();
    
    const query = ({
      ...(selectedCurrency === 'All' || {currency: selectedCurrency}),
      ...(selectedLP === 'All' || {lp: selectedLP})
    });

    this.props.updateChartData(query);

  }

  render() {
    
    return (
      <MuiThemeProvider theme={theme}>  
        <FilterConsumer>
          {
            ({changeCurrency, changeLP, selectedCurrency, selectedLP})=>{
              return (
                <div className='mt-m'>
                  <Row>
                    <form onSubmit={(e)=>this.handleSubmit(e, selectedCurrency, selectedLP)}>
                      <Input s={6}
                          onChange={(e,currency)=>changeCurrency(currency)}
                          type='select' 
                          label='Currency'
                          defaultValue='All'>
                        <option value='All'>All</option>
                        <SelectionList lists={this.state.currencies} />
                      </Input>
                      <Input s={6}
                          onChange={(e, value)=>changeLP(value)}
                          type='select'
                          label='LP'
                          defaultValue='All'>
                        <option value='All'>All</option>
                        <SelectionList lists={this.state.lps} />
                      </Input>
                      <div className='center-align'>
                        <Button variant="contained" 
                          color="primary"
                          type="submit">
                          Search
                        </Button>
                      </div>
                    </form>
                  </Row>
                </div>
              );
            }
          }
        </FilterConsumer>
      </MuiThemeProvider>
    );
  }
};

export default FilterBar;