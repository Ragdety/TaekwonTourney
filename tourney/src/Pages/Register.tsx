import React, { useState} from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import identity from "../APICalls/identity";
import { Redirect } from "react-router";

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
    "@media (min-width: 2140px)":{
      width: 450,
    },
  },
  label:{
    display: 'flex',
    marginTop: '10px',
    fontSize: '18px',
    "@media (min-width: 2140px)":{
      fontSize: 38,
    },
  },
  formInput:{
    width: '100%',
    padding: '7px',
    border: '1px solid grey',
    borderRadius: '6px',
    outline: 'none',
    "@media (min-width: 2140px)":{
      width: 450,
      height: 40,
      fontSize: 25,
    },
  },
  submitButton: {
    backgroundColor: '#4aedc4',
    fontSize: '18px',
    color: 'white',
    marginTop: '14px',
    marginLeft: '12px',
    height: '40px',
    width: '280px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    "@media (min-width: 2140px)": {
      width: 400,
      height: 70,
      fontSize: 40,
      marginTop: 40,
    },
  },
  p2:{
      marginTop: 0, marginBottom: -5,
  },
  p4:{
    marginTop: 0,
    "@media (min-width: 2140px)": {
      marginTop: 20,
      fontSize: 30,
      marginLeft: 120,
    },
  },
  h1: {
    justifyContent: 'center',
    "@media (min-width: 2140px)": {
        fontSize: 50,
    },
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
  const [firstNameError] = useState('');
  const [lastNameError] = useState('');
  const [emailError] = useState('');
  const [usernameError] = useState('');
  const [passwordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (e: any, name: any) => {
    const user: any = {};
    //var emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    user[name] = e.target.value;
    
    switch(name){
      case 'firstName':
        setFirstName(user.firstName);
        //user.firstName.length < 2 ? setFirstNameError('First Name must be at least 2 characters') : setFirstNameError('');
        break;
      case 'lastName':
        setLastName(user.lastName);
        //user.lastName.length < 2 ? setLastNameError('Last Name must be at least 2 characters') : setLastNameError('');
        break;
      case 'email':
        setEmail(user.email);
        //!emailRegex.test(user.email) ? setEmailError('Invalid Email') : setEmailError('');
        break;
      case 'username':
        setUsername(user.username);
        //user.username.length < 8 ? setUsernameError('Username must be at least 8 or more characters') : setUsernameError('');
        break;
      case 'password':
        setPassword(user.password);
        //user.password.length < 8 ? setPasswordError('Password must be 8 or more characters') : setPasswordError('');
        break;
      case 'confirmPassword':
        setConfirmPassword(user.confirmPassword);
        user.confirmPassword !== password ? setConfirmPasswordError('Passwords must be the same') : setConfirmPasswordError('');
        break;
      default:
        break;
    }
  }
  
  const register = async (e: { preventDefault: () => void; }) => {
    e.preventDefault() //To not reload page for now
    const res = await identity.post('/register', {
      FirstName: firstName,
      LastName: lastName,
      Username: username,
      Email: email,
      Password: password,
      UserRole: "Organizer",
      //Need to add dropdown to support UserRoles: 
      //["Organizer", "Student", "Instructor", "FamilyMember"]
    })
        .then(res => {
          setRedirect(true);
        })
        .catch((error: any) => {
          const errors = error.response.data.errors;
          //console.log(errors);
          setErrors(errors);
          //Will set error states here:
          setError(true);
        });
  }

  if(redirect){
    return <Redirect to='/Login' />;
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} id="signup" onSubmit={register}>
        <h1 className={classes.h1}>Register</h1>
          <label className={classes.label}>First Name </label>
          <input
            id="First_Name" 
            type="text" 
            className={classnames(classes.formInput, {'is-invalid' : firstNameError, 'is-valid' : !firstNameError && firstName.length})}
            autoFocus 
            placeholder="Enter Your First Name"
            required
            onChange={(e) => handleChange(e, 'firstName')}
            minLength={2}
            maxLength={15}
           />
          {/*{firstNameError && <p className={classes.p2} style={{color: 'red'}}>{firstNameError}</p>}*/}

          <label className={classes.label}>Last Name </label>
          <input
            id="Last_Name" 
            type="text" 
            className={classnames(classes.formInput, {'is-invalid' : lastNameError, 'is-valid' : !lastNameError && lastName.length})}
            placeholder="Enter Your Last Name"
            required
            onChange={(e) => handleChange(e, 'lastName')}
            minLength={2}
            maxLength={15}
          />
          {/*{lastNameError && <p className={classes.p2} style={{color: 'red'}}>{lastNameError}</p>}*/}

          <label className={classes.label}>Email </label>
          <input 
            id="Email"
            type="text"
            className={classnames(classes.formInput, {'is-invalid' : emailError, 'is-valid' : !emailError && email.length})} 
            placeholder="Enter Your Email Address"
            required
            onChange={(e) => handleChange(e, 'email')}
          />
         {/*{emailError && <p className={classes.p2} style={{color: 'red'}}>{emailError}</p>}*/}

          <label className={classes.label}>Create Username </label>
          <input 
            id="Username"
            type="text" 
            className={classnames(classes.formInput, {'is-invalid' : usernameError, 'is-valid' : !usernameError && username.length})} 
            placeholder="Enter Your Username"
            required
            onChange={(e) => handleChange(e, 'username')}
            maxLength={20}
          />
         {/*{usernameError && <p className={classes.p2} style={{color: 'red'}}>{usernameError}</p>}*/}

          <label className={classes.label}>Create Password </label>
          <input
            id="Password" 
            type="password"
            className={classnames(classes.formInput, {'is-invalid' : passwordError, 'is-valid' : !passwordError && password.length})} 
            placeholder="Enter Password"
            required
            onChange={(e) => handleChange(e, 'password')}
            maxLength={15}
          />
          {/*<p className={classes.p2}></p>*/}
          {/*{passwordError && <p className={classes.p2} style={{color: 'red', marginTop: 5}}>{passwordError}</p>}*/}

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

        <button className={classes.submitButton} type="submit" /*onClick={register}*/>Register</button>
        {/*{error && <p style={{color: 'red', marginTop: 5}}>An error ocurred...</p>}*/}
        {errors && errors.map((e: any) => (
            <p style={{color: 'red', marginTop: 5}}>{e}</p>
            ))}
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