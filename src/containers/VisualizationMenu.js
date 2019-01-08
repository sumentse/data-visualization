import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
    color: '#fff',
    '&:focus': {
      background: blue[800]
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true,
  },
});

class VisualizationMenu extends Component {
  constructor() {
    super()
    this.state = {};

  }
  render() {
    const {classes} = this.props;

    return (
      <div className="mt-m ml-xs">
        <span>View Chart As:</span>
        <MuiThemeProvider theme={theme}>
          <Button variant="contained" 
            color="primary"
            onClick={()=>this.props.changeChartCallback('table')}
            className={classes.button}>
            Table
          </Button>
          <Button variant="contained" 
            color="primary" 
            onClick={()=>this.props.changeChartCallback('line')}
            className={classes.button}>
            Line
          </Button>
        </MuiThemeProvider>
      </div>
    );
  }
};

VisualizationMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VisualizationMenu);