import React, {Component} from 'react'
import AuthenticationService from '../Authentication/AuthenticationService';
import { useState } from 'react';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/core/';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export default  function LoginComponent(props)
{


    const [enteredUsername,setUserName] = useState('');
    const [enteredPassword,setPassword] = useState('');
    const [hasLoginFailed,setHasLoginFailed] = useState(false);
    const [error,setError] = useState('');
    const classes = useStyles();

    const handleUserNameFieldChanged = (event) => { 
        setUserName(event.target.value);            
    }
    const handlePasswordFieldChanged = (event) => {  
            setPassword(event.target.value);
    }

    const userDetails = { 

        username: enteredUsername ,
        pass: enteredPassword

    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(userDetails);
        AuthenticationService.executeJWtAuthenticationService(userDetails.username,userDetails.pass)
        .then((response)=>{
            console.log(response.data.token);
            
            AuthenticationService.registerSuccesfullLoginForJwt(userDetails.username,response.data.token)
            if(sessionStorage.getItem("USER_ROLE")=="ADMIN" ){
                props.history.push(`/admin/dashboard/${userDetails.username}`)
            }
            else if(sessionStorage.getItem("USER_ROLE")=="TEACHER" ){
                props.history.push(`/teacher/${userDetails.username}/subjects`)
            }
            else if(sessionStorage.getItem("USER_ROLE")=="PUPIL"){
              props.history.push(`/pupil/welcome/${userDetails.username}`)
            }
        
        }).catch(
          (error)=>{
            console.log(error);
          
          }
        );

        setUserName('');
        setPassword('');
    }

    
    
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={submitHandler} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="UserName"
                value={enteredUsername}
                onChange={handleUserNameFieldChanged}
                autoComplete="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="password"
                value={enteredPassword}
                onChange={handlePasswordFieldChanged}
                autoComplete="current-password"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Sign In
              </Button>
            </form>
          </div>
        </Container>
      );
}
    



