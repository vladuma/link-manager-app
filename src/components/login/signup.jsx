import React, { Component } from "react";
import { connect } from "react-redux";

import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    height: '100%',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    justifySelf: 'flex-end',
    marginTop: 'auto',
  },
  textField: {
    width: 200,
  },
}));

import { signup } from "../../store/actions/authActions";

const Signup = (props) => {
  const classes = useStyles();
  const { authError, auth } = props;
  const [values, setValues] = React.useState({
    password: '',
    passwordConf: '',
    email: '',
    showPassword: false,
  });

  const handleChange = prop => e => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log({email: values.email, password: values.password, passwordConf: values.passwordConf});

    props.signup({
        email: values.email,
        password: values.password,
        passwordConf: values.passwordConf
    });
  };

  return (    
        <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
          {authError ? 
            <TextField required error id="standard-error-helper-text" label="Login" placeholder="email@email.com" onChange={handleChange('email')} />          
          :
            <TextField required id="standard-required" label="Login" placeholder="email@email.com" onChange={handleChange('email')} />          
          }
          {authError ? 
          <div className={classes.column}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel error htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                required error
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel error htmlFor="standard-adornment-password">Confirm Password</InputLabel>
              <Input
                id="standard-adornment-password"
                required error
                type={values.showPassword ? 'text' : 'password'}
                value={values.passwordConf}
                onChange={handleChange('passwordConf')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          : 
          <div className={classes.column}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>              
              <Input
                id="standard-adornment-password"
                required
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>              
              <Input
                id="standard-adornment-password"
                required
                type={values.showPassword ? 'text' : 'password'}
                value={values.passwordConf}
                onChange={handleChange('passwordConf')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          }
          {authError ? 
            <FormHelperText id="component-error-text" className={classes.margin}>{authError.err.message}</FormHelperText>
            :
            null
          }
          <Button className={classes.button} variant="outlined" color="primary" onClick={handleSubmit}>
            Register
          </Button>
        </form>   
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (newUser) => dispatch(signup(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);