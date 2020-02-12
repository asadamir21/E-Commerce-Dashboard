import React,{useState} from "react";
//import ReactDOM from "react-dom";
//import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
//import Admin from "layouts/Admin.js";
import hist from "../index";
import "assets/css/material-dashboard-react.css?v=1.8.0";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const md5 = require('md5');

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/asadamir21">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?products)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const User = {
  UserID: '',
  UserPassword: '',
  UserHashedPassword: ''
}

function handleUserIDChange(event) {
  User.UserID = event.target.value;
}

function handlePasswordChange(event) {
  User.UserPassword = event.target.value;
}

function handleSubmit(event) {
  event.preventDefault();

  if (User.UserID.length > 0 && User.UserPassword.length > 0){
    User.UserHashedPassword = md5(User.UserPassword)
    
    axios.post(`http://localhost:7500/SignIn`, { User })  
      .then(res => {
        console.log(res)
        //console.log(res.cookie())   
        // if (res.data.rowCount > 0){
        //   ReactDOM.render(
        //     <Router history={hist}>
        //       <Switch>
        //         <Route path="/admin" component={Admin} />
        //         <Redirect from="/SignIn" to="/admin/dashboard" />
        //       </Switch>
        //     </Router>,
        //     document.getElementById("root")
        //   );
        // }
        // else{
        //   alert("Incorrect UserID or Password")
        // }
        //hist.push('/admin/dashboard')
      })
      .catch(res => {
        //console.log(res);
      });
    }
    else{
      return(dispatch) => {
        dispatch({
          //type: ENTRY_ERROR_SET,
          type: 106,
          payload: "Don't leave fields empty!"
        })
      }
    }
}
export default function SignInSide() {
  const classes = useStyles();
  const [displayerror, setDisplayerror] = useState('')
  return (
    <Grid container component="main" className={classes.root}>
      
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="User ID"
              label="User ID"
              name="User ID"
              autoComplete="User ID"
              onChange={handleUserIDChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
             Sign In
            </Button>
            {displayerror}
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
