import React, { useState} from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import identity from "../APICalls/identity";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign:'center',
    width: '320px',
    height: '620px',
    margin: 'auto',
    marginTop: '50px',
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
    width: '100%',
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
    marginTop: '14px',
    marginLeft: '12px',
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
    marginTop: 0,
  },
}));

function Register() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleChange = (e: any, name: any) => {
    const user: any = {};
    var emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    user[name] = e.target.value;
    
    switch(name){
      case 'firstName':
        setFirstName(user.firstName);
        user.firstName.length < 2 ? setFirstNameError('First Name must be at least 2 characters') : setFirstNameError('');
        break;
      case 'lastName':
        setLastName(user.lastName);
        user.lastName.length < 2 ? setLastNameError('Last Name must be at least 2 characters') : setLastNameError('');
        break;
      case 'email':
        setEmail(user.email);
        !emailRegex.test(user.email) ? setEmailError('Invalid Email') : setEmailError('');
        break;
      case 'username':
        setUsername(user.username);
        user.username.length < 8 ? setUsernameError('Username must be at least 8 or more characters') : setUsernameError('');
        break;
      case 'password':
        setPassword(user.password);
        user.password.length < 8 ? setPasswordError('Password must be 8 or more characters') : setPasswordError('');
        break;
      case 'confirmPassword':
        setConfirmPassword(user.confirmPassword);
        user.confirmPassword !== password ? setConfirmPasswordError('Passwords must be the same') : setConfirmPasswordError('');
        break;
      default:
        break;
    }
  }

  function signUp(){
      identity.post('/register', {
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        Email: email,
        Password: password,
        UserRole: 1
    });
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} id="signup">
        <h1>Sign Up</h1>
          <label className={classes.label}>First Name </label>
          <input
            id="First_Name" 
            type="text" 
            className={classnames(classes.formInput, {'is-invalid' : firstNameError, 'is-valid' : !firstNameError && firstName.length})}
            autoFocus 
            placeholder="Enter Your First Name"
            required
            onChange={(e) => handleChange(e, 'firstName')}
           />
          {firstNameError && <p className={classes.p2} style={{color: 'red'}}>{firstNameError}</p>}

          <label className={classes.label}>Last Name </label>
          <input
            id="Last_Name" 
            type="text" 
            className={classnames(classes.formInput, {'is-invalid' : lastNameError, 'is-valid' : !lastNameError && lastName.length})}
            placeholder="Enter Your Last Name"
            required
            onChange={(e) => handleChange(e, 'lastName')}
          />
          {lastNameError && <p className={classes.p2} style={{color: 'red'}}>{lastNameError}</p>}

          <label className={classes.label}>Email </label>
          <input 
            id="Email"
            type="text"
            className={classnames(classes.formInput, {'is-invalid' : emailError, 'is-valid' : !emailError && email.length})} 
            placeholder="Enter Your Email Address"
            required
            onChange={(e) => handleChange(e, 'email')}
          />
         {emailError && <p className={classes.p2} style={{color: 'red'}}>{emailError}</p>}

          <label className={classes.label}>Create Username </label>
          <input 
            id="Username"
            type="text" 
            className={classnames(classes.formInput, {'is-invalid' : usernameError, 'is-valid' : !usernameError && username.length})} 
            placeholder="Enter Your Username"
            required
            onChange={(e) => handleChange(e, 'username')}
          />
         {usernameError && <p className={classes.p2} style={{color: 'red'}}>{usernameError}</p>}

          <label className={classes.label}>Create Password </label>
          <input
            id="Password" 
            type="password"
            className={classnames(classes.formInput, {'is-invalid' : passwordError, 'is-valid' : !passwordError && password.length})} 
            placeholder="Enter Password"
            required
            onChange={(e) => handleChange(e, 'password')}
          />
          <p className={classes.p2}></p>
          {passwordError && <p className={classes.p2} style={{color: 'red', marginTop: 5}}>{passwordError}</p>}

          <label className={classes.label} style={{marginTop: 15}}>Confirm Password </label>
          <input 
            id="Confirm Password"
            type="password" 
            className={classnames(classes.formInput, {'is-invalid' : confirmPasswordError, 'is-valid' : !confirmPasswordError && confirmPassword.length})}
            placeholder="Confirm Your Password"
            required
            onChange={(e) => handleChange(e, 'confirmPassword')}
          />
         {confirmPasswordError && <p className={classes.p2} style={{color: 'red'}}>{confirmPasswordError}</p>}

        <button className={classes.submitButton} type="submit" onClick={signUp}>Sign Up</button>
      </form>
      <p className={classes.p4}>Already have an account? 
         <Link to="/Login" style={{textDecoration:'none', color:'blue'}}> 
         &ensp;Login Here
         </Link>
      </p>
    </div>
  );
}

export default Register;
