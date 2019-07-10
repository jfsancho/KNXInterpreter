import React, { Component,Fragment} from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import AppHeader from './components/AppHeader';
//import Home from './pages/Home';
import Devices from './pages/devices';

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing(1),
    },
  },
});


class App extends Component {

  constructor(props) {
    super(props)

    this.state={
        device:null
    }


  }

  render(){
    return (
      <Fragment>
        <CssBaseline />
        <AppHeader />
        <main className='App'>
          <Devices/>
        </main>
    </Fragment>
    )}
}


export default withStyles(styles) (App);