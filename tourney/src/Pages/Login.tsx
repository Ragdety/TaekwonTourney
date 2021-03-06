import React, { useState} from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import identity from "../APICalls/identity";
import { Redirect } from "react-router";
import { useCookies } from 'react-cookie';

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
    marginLeft: '5px',
    "@media (min-width: 1440px)": {
      fontSize: 30,
    },
    "@media (min-width: 2140px)": {
      fontSize: 50,
    }
  },
  label:{
    display: 'flex',
    marginTop: '10px',
    fontSize: '18px',
    "@media (min-width: 1440px)": {
      fontSize: 30,
      marginLeft: -160,
    },
    "@media (min-width: 2140px)": {
      fontSize: 50,
      marginLeft: -460,
    }
  },
  formInput:{
    height: 'auto',
    width: '95%',
    padding: '7px',
    border: '1px solid grey',
    borderRadius: '6px',
    marginLeft: -5,
    outline: 'none',
    "@media (min-width: 1440px)": {
      width: 650,
      height: 50,
      marginLeft: -160,
      fontSize: 20,
    },
    "@media (min-width: 2140px)": {
      width: 1250,
      height: 100,
      marginLeft: -470,
      fontSize: 40,
      borderWidth: 2,
    }
  },
  submitButton: {
    backgroundColor: '#4aedc4',
    fontSize: '18px',
    color: 'white',
    marginTop: '24px',
    height: '40px',
    width: '280px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    "@media (min-width: 1440px)": {
      width: 350,
      height: 70,
      marginLeft: -20,
      fontSize: 30,
    },
    "@media (min-width: 2140px)": {
      width: 650,
      height: 120,
      marginLeft: -170,
      fontSize: 50,
      marginTop: 40,
    }
  },
  p2:{
      marginTop: 0, marginBottom: -5,
  },
  p4:{
      marginLeft: -20,
      marginTop: 15,
      "@media (min-width: 1440px)": {
        fontSize: 30,
        marginLeft: 20,
      },
      "@media (min-width: 2140px)": {
        marginTop: 30,
        fontSize: 40,
        marginLeft: 20,
      },
  },
  h1: {
    justifyContent: 'center',
    "@media (min-width: 2140px) and (max-width: 2560px)": {
        fontSize: 100,
    },
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useCookies(['jwt']);
  const [emailError] = useState('');
  const [passwordError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(false);

  const handleChange = (e: any, name: any) => {
    const user: any = {};
    //var emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    user[name] = e.target.value;
    
    switch(name){
      case 'email':
        setEmail(user.email);
        //!emailRegex.test(user.email) ? setEmailError('Invalid Email') : setEmailError('');
        break;
      case 'password':
        setPassword(user.password);
        //user.password.length < 8 ? setPasswordError('Password must be 8 or more characters') : setPasswordError('');
        break;
      default:
        break;
    }
  }

  const handleCookies = (res: any) => {
      const jsonObject = JSON.stringify(res.data);
      const token = JSON.parse(jsonObject).token;
      const validTo = JSON.parse(jsonObject).validTo;
      
      const expires = new Date(validTo.toString());
      console.log(expires)
      //const now = new Date();

      //let diffInMilliSeconds = Math.abs(expires.getTime() - now.getTime()) / 1000;

      //const expiresIn = Math.floor(diffInMilliSeconds / 60) % 60;
      //diffInMilliSeconds -= expiresIn * 60;
      
      //console.log(`Token expires in ${expiresIn} minutes`);
      //expires.setTime(expires.getTime() + (validTo * 1000))
      setCookie('jwt', token, {
          expires: expires
      });
 };

  const login = async (e: { preventDefault: () => void; }) => {
    e.preventDefault() //To not reload page for now
    const res = await identity.post('/login', {
      UserNameOrEmail: email,
      Password: password,
      //Need to add dropdown to support UserRoles: 
      //["Organizer", "Student", "Instructor", "FamilyMember"]
    })
       .then(res => {
          console.log(res);
          handleCookies(res);
        })
        .then(res => {
            setRedirect(true);
        })
        .catch(error => {
          console.log(error);
          const errors = error.response.data;
          //Will set error states here:
          console.log(errors);
          setError(true);
          setErrors(errors);
        });
  }

  if(redirect){
    return <Redirect to='/' />;
  }
  const stringedErrors =  JSON.stringify(errors);
  const parsed = JSON.parse(stringedErrors);
  let values = Object.values(parsed);

  return (
    <div className={classes.container}>
      <form className={classes.form} id="signup" onSubmit={login}>
        <h1 className={classes.h1}>Log In</h1>
          <label className={classes.label}>Username or Email </label>
          <input 
            type="text"
            className={classnames(classes.formInput, {'is-invalid' : emailError, 'is-valid' : !emailError && email.length})} 
            placeholder="Enter Your Username or Email Address"
            required
            onChange={(e) => handleChange(e, 'email')}
          />
         {/*{emailError && <p className={classes.p2} style={{color: 'red'}}>{emailError}</p>}*/}
          <label className={classes.label}>Enter Password </label>
          <input 
            type="password"
            className={classnames(classes.formInput, {'is-invalid' : passwordError, 'is-valid' : !passwordError && password.length})} 
            placeholder="Enter Password"
            required
            onChange={(e) => handleChange(e, 'password')}
          />
          <p className={classes.p2}></p>
          {/*{passwordError && <p className={classes.p2} style={{color: 'red', marginTop: 5}}>{passwordError}</p>}*/}
        <button className={classes.submitButton} type="submit">Log In</button>

          {error && <p style={{color: 'red', marginTop: 5}}>{values}</p>}
        {/*{errors && <p className={classes.p2} style={{color: 'red', marginTop: 5}}>{errors}</p>}*/}
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

