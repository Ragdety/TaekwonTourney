import React from 'react';
import NavBar from '../Components/NavBar';
import HomeCards from '../Components/HomeCards';
import { makeStyles } from '@mui/styles';
import Taekwondo from '../Images/Taekwondo.png';
import TaekwondoPicTwo from '../Images/TaekwonTourneyPicTwo.webp';
import TaekwonTourneyLogo from '../Images/TaekwonTourneyLogo.png';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';

function Home(){

    const useStyles = makeStyles((theme) => ({
        div:{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        centerText: {
          marginTop: 40,
          marginBottom: -10,
        },
        btn: {
            cursor: 'pointer', 
            marginBottom: 20, 
            color: 'black', 
            border: '3px solid #2196f3',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
        },
      }));

    const classes = useStyles();
    let history = useHistory();

    const redirectToRegister = () => {
        history.push('/Register');
    }
    return(
        <>
            <NavBar />
                <div className={classes.div}>
                    <h1 className={classes.centerText}>THE PLACE FOR ALL OF YOUR</h1>
                        <h1>TAEKWONDO TOURNAMENT NEEDS</h1>
                        <Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={12}>
                                    <Grid item>
                                        <img src={TaekwondoPicTwo} alt="TaekwondoTourneyPicTwo" height="131px" /><br></br><br></br>
                                    </Grid>
                                    <Grid item>
                                        <img src={TaekwonTourneyLogo} alt="Taekwondo" height="131px" /><br></br><br></br>
                                    </Grid>
                                    <Grid item>
                                        <img src={Taekwondo} alt="Taekwondo" height="131px" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    <Button style={{cursor: 'pointer', 
            marginBottom: 20, 
            color: 'black', 
            border: '3px solid #2196f3',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,}} disableRipple onClick={redirectToRegister}>SIGN UP!</Button>
                </div>
            <HomeCards />
            <div>
                <Box textAlign='center'>
                    <Button style={{cursor: 'pointer', 
            marginBottom: 20, 
            color: 'black', 
            border: '3px solid #2196f3',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,}} disableRipple onClick={redirectToRegister}>CREATE YOUR TOURNEY!</Button>
                </Box>
            </div>
        </>
    )
}
export default Home;