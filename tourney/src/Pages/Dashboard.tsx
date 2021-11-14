import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import user from "../APICalls/user";
import tournaments from "../APICalls/tournaments";
import DashBoardNavBar from '../Components/DashBoardNavBar';
import { makeStyles } from '@mui/styles';
//import PreviousTournamentCards from '../Components/PreviousTournamentCards';
//import CurrentTournamentCards from '../Components/CurrentTournamentCards';
//import FutureTournamentCards from '../Components/FutureTournamentCards';
//import { Link } from 'react-router-dom';
//import { useCookies } from 'react-cookie';
//import Cookies from 'js-cookie';
import FutureTournamentCards from '../Components/FutureTournamentCards';
export default function Dashboard(){

    const [userName, setUserName] = useState('');
    //const [token, setToken] = useCookies(['jwt']);
    const [clicked, setClicked] = useState(false);
    const useStyles = makeStyles((theme) => ({
        tr: {
          float: 'right',
          marginTop: -80,
          marginRight: -22,
          backgroundColor: '#4aedc4',
            '&: hover':{
            boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
            backgroundColor: '#14a37f',
            },
            fontSize: '18px',
            color: 'white',
            height: '35px',
            width: '180px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
        },
      }));

      function handleClick(){
          setClicked(true);
      }
    
      const classes = useStyles();
    
    useEffect(() => {
        (
            async () => {
                await 
                    user.get('/me')
                    .then((res:any) => {
                        const content = res.data
                        console.log('Response', res.data)
                        console.log(content);
                        setUserName(content.userName);
                }).catch((error) => {
                    console.log(error);
                });
                
            }
        )();
    });

    useEffect(() => {
        (
            async () => {
                await 
                    tournaments.get('/')
                    .then((res:any) => {
                        const content = res.data.data;
                        console.log(content);
                }).catch((error) => {
                    console.log(error);
                });
            }
        )();
    });

    return(
        <>
            <DashBoardNavBar />
            <h1>Dashboard</h1>
                <Typography variant="h6">
                    Hello {userName}!
                </Typography>
                <Grid>
                    <Grid item xs={1}>
                        <h2 style={{marginLeft: 10}}>Previous Tournaments</h2>
                    </Grid>
                    <Grid item xs={11}>
                        <button className={classes.tr} onClick={handleClick}>Create Tournament</button>
                    </Grid>
                </Grid>
            <div>
                {/*<PreviousTournamentCards /> */}
                <Typography variant="h6" style={{marginLeft: 20}}>
                    N/A
                </Typography>
            </div>
            <h2 style={{marginLeft: 10}}>Current Tournaments</h2>
            <div>
                {/*CurrentTournamentCards />*/}
                <Typography variant="h6" style={{marginLeft: 20}}>
                    N/A
                </Typography>
            </div>
            <h2 style={{marginLeft: 10}}>Future Tournaments</h2>
            <div>
                {clicked ? <FutureTournamentCards /> : <Typography variant="h6" style={{marginLeft: 20}}>
                    N/A
                </Typography>}
                {/*<FutureTournamentCards />*/}
            </div>
        </>
    )
}