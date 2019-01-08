import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiAppBar: {
      root: {
        'box-shadow':'none'
      }
    }
  }
});


const Header = (props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" color="inherit">
            {props.brand}
          </Typography>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );

};

export default Header;
