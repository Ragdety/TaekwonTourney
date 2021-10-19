import React, { useState} from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign:'center',
    width: '320px',
    height: '620px',
    margin: 'auto',
    marginTop: '170px',
  },
  form: {
    marginTop: '10px',
    width: '290px',
    marginLeft: '5px',
  },
  label:{
    display: 'flex',
    marginTop: '10px',
    fontSize: '18px',
  },
  formInput:{
    height: 'auto',
    width: '95%',
    padding: '7px',
    border: '1px solid grey',
    borderRadius: '6px',
    outline: 'none',
  },
  submitButton: {
    backgroundColor: '#4aedc4',
    '&: hover':{
      boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
      backgroundColor: '#14a37f',
    },
    fontSize: '18px',
    color: 'white',
    marginTop: '24px',
    height: '40px',
    width: '280px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  p2:{
      marginTop: 0, marginBottom: -5,
  },
  p4:{
      marginLeft: -20,
      marginTop: 15,
  },
  h1: {
    justifyContent: 'center',
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: any, name: any) => {
    const user: any = {};
    var emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    user[name] = e.target.value;
    
    switch(name){
      case 'email':
        setEmail(user.email);
        !emailRegex.test(user.email) ? setEmailError('Invalid Email') : setEmailError('');
        break;
      case 'password':
        setPassword(user.password);
        user.password.length < 8 ? setPasswordError('Password must be 8 or more characters') : setPasswordError('');
        break;
      default:
        break;
    }
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} id="signup">
        <h1 className={classes.h1}>Log In</h1>
          <label className={classes.label}>Email </label>
          <input 
            type="text"
            className={classnames(classes.formInput, {'is-invalid' : emailError, 'is-valid' : !emailError && email.length})} 
            placeholder="Enter Your Email Address"
            required
            onChange={(e) => handleChange(e, 'email')}
          />
         {emailError && <p className={classes.p2} style={{color: 'red'}}>{emailError}</p>}
          <label className={classes.label}>Enter Password </label>
          <input 
            type="password"
            className={classnames(classes.formInput, {'is-invalid' : passwordError, 'is-valid' : !passwordError && password.length})} 
            placeholder="Enter Password"
            required
            onChange={(e) => handleChange(e, 'password')}
          />
          <p className={classes.p2}></p>
          {passwordError && <p className={classes.p2} style={{color: 'red', marginTop: 5}}>{passwordError}</p>}
        <button className={classes.submitButton} type="submit">Sign Up</button>
      </form>
      <p className={classes.p4}>Don't have an account? 
         <Link to="/Register" style={{textDecoration:'none', color:'blue'}}> 
         &ensp;Sign Up Here
         </Link>
      </p>
    </div>
  );
}

export default Login;
