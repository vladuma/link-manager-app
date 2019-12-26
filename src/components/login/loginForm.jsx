import React from 'react';

import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Signup from './signup';
import Signin from "./signin";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
  },
  paper: {
    minHeight: '275px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(3, 3, 2),
  },
  link: {
    marginTop: theme.spacing(1),
    cursor: 'pointer',
  }
}));

const LoginForm = (props) =>  { 
  const [ screen, setScreen ] = React.useState('login');
  const classes = useStyles();

  const switchScreen = () => {
    console.log(screen);
    setScreen(screen === 'login' ? 'signup' : 'login');
  }
  
  return(
    <Grid container className={classes.root}>
    <Paper className={classes.paper}>
      {screen === 'login' ? 
        <Signin/>
      :
        <Signup/>
      }
      <a onClick={switchScreen} className={classes.link}>{screen === 'login'? "Create account" : "Login"}</a>
    
    </Paper>
  </Grid>   
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(LoginForm);