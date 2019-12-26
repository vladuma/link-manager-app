import React, { Component } from 'react';

import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppBar from './nav/appBar';
import Dashboard from './dashboard/dashboard';
import Settings from './settings/settings';
import LoginForm from './login/loginForm';
import Edit from './project/edit';
import View from './project/view';

import CssBaseline from "@material-ui/core/CssBaseline";

import useStyles from '../styles/classes';

const App = props => {
  const classes = useStyles();
  const { auth } = props;

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar/>        
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch >
            <Route exact path="/" component={auth && auth.uid ? Dashboard : LoginForm}></Route>
            <Route path="/settings" component={auth && auth.uid ? Settings : LoginForm}></Route>
            <Route path="/create" component={auth && auth.uid ? Edit : LoginForm}></Route>
            <Route path="/edit/:id" component={auth && auth.uid ? Edit : LoginForm}></Route>
            <Route path="/project/:id" component={auth && auth.uid ? View : LoginForm}></Route> 
          </Switch>
        </main>
      </div>

    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(App);