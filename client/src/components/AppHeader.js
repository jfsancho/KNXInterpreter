import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

const AppHeader = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography  color="inherit">
        BMS Manager
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AppHeader;
